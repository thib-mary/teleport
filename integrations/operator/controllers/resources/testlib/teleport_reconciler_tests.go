// Copyright 2023 Gravitational, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package testlib

import (
	"context"
	"testing"

	"github.com/gravitational/trace"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	kerrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/client-go/util/retry"

	"github.com/gravitational/teleport/api/types"
	"github.com/gravitational/teleport/integrations/operator/controllers/resources"
)

type ResourceTestingPrimitives[T resources.TeleportResource, K resources.TeleportKubernetesResource[T]] interface {
	Init(setup *TestSetup)
	SetupTeleportFixtures(context.Context) error
	// Interacting with the Teleport Resource
	CreateTeleportResource(context.Context, string) error
	GetTeleportResource(context.Context, string) (T, error)
	DeleteTeleportResource(context.Context, string) error
	// Interacting with the Kubernetes Resource
	CreateKubernetesResource(context.Context, string) error
	DeleteKubernetesResource(context.Context, string) error
	GetKubernetesResource(context.Context, string) (K, error)
	ModifyKubernetesResource(context.Context, string) error
	// Comparing both
	CompareTeleportAndKubernetesResource(T, K) (bool, string)
}

func ResourceCreationTest[T resources.TeleportResource, K resources.TeleportKubernetesResource[T]](t *testing.T, test ResourceTestingPrimitives[T, K], opts ...TestOption) {
	ctx := context.Background()
	setup := SetupTestEnv(t, opts...)
	test.Init(setup)
	resourceName := ValidRandomResourceName("resource-")

	err := test.SetupTeleportFixtures(ctx)
	require.NoError(t, err)

	err = test.CreateKubernetesResource(ctx, resourceName)
	require.NoError(t, err)

	var tResource T
	FastEventually(t, func() bool {
		tResource, err = test.GetTeleportResource(ctx, resourceName)
		return !trace.IsNotFound(err)
	})
	require.NoError(t, err)
	require.Equal(t, resourceName, tResource.GetName())
	require.Contains(t, tResource.GetMetadata().Labels, types.OriginLabel)
	require.Equal(t, types.OriginKubernetes, tResource.GetMetadata().Labels[types.OriginLabel])

	err = test.DeleteKubernetesResource(ctx, resourceName)
	require.NoError(t, err)

	FastEventually(t, func() bool {
		_, err = test.GetTeleportResource(ctx, resourceName)
		return trace.IsNotFound(err)
	})
}

func ResourceDeletionDriftTest[T resources.TeleportResource, K resources.TeleportKubernetesResource[T]](t *testing.T, test ResourceTestingPrimitives[T, K], opts ...TestOption) {
	ctx := context.Background()
	setup := SetupTestEnv(t, opts...)
	test.Init(setup)
	resourceName := ValidRandomResourceName("user-")

	err := test.SetupTeleportFixtures(ctx)
	require.NoError(t, err)

	err = test.CreateKubernetesResource(ctx, resourceName)
	require.NoError(t, err)

	var tResource T
	FastEventually(t, func() bool {
		tResource, err = test.GetTeleportResource(ctx, resourceName)
		return !trace.IsNotFound(err)
	})
	require.NoError(t, err)

	require.Equal(t, resourceName, tResource.GetName())

	require.Contains(t, tResource.GetMetadata().Labels, types.OriginLabel)
	require.Equal(t, types.OriginKubernetes, tResource.GetMetadata().Labels[types.OriginLabel])

	// We cause a drift by altering the Teleport resource.
	// To make sure the operator does not reconcile while we're finished we suspend the operator
	setup.StopKubernetesOperator()

	err = test.DeleteTeleportResource(ctx, resourceName)
	require.NoError(t, err)
	FastEventually(t, func() bool {
		_, err = test.GetTeleportResource(ctx, resourceName)
		return trace.IsNotFound(err)
	})

	// We flag the resource for deletion in Kubernetes (it won't be fully removed until the operator has processed it and removed the finalizer)
	err = test.DeleteKubernetesResource(ctx, resourceName)
	require.NoError(t, err)

	// Test section: We resume the operator, it should reconcile and recover from the drift
	setup.StartKubernetesOperator(t)

	// The operator should handle the failed Teleport deletion gracefully and unlock the Kubernetes resource deletion
	FastEventually(t, func() bool {
		_, err = test.GetKubernetesResource(ctx, resourceName)
		return kerrors.IsNotFound(err)
	})
}

func ResourceUpdateTest[T resources.TeleportResource, K resources.TeleportKubernetesResource[T]](t *testing.T, test ResourceTestingPrimitives[T, K], opts ...TestOption) {
	ctx := context.Background()
	setup := SetupTestEnv(t, opts...)
	test.Init(setup)
	resourceName := ValidRandomResourceName("user-")

	err := test.SetupTeleportFixtures(ctx)
	require.NoError(t, err)

	// The resource is created in Teleport
	err = test.CreateTeleportResource(ctx, resourceName)
	require.NoError(t, err)

	// The resource is created in Kubernetes, with at least a field altered
	err = test.CreateKubernetesResource(ctx, resourceName)
	require.NoError(t, err)

	// Check the resource was updated in Teleport
	FastEventuallyWithT(t, func(c *assert.CollectT) {
		tResource, err := test.GetTeleportResource(ctx, resourceName)
		require.NoError(c, err)

		kubeResource, err := test.GetKubernetesResource(ctx, resourceName)
		require.NoError(c, err)

		// Kubernetes and Teleport resources are in-sync
		equal, diff := test.CompareTeleportAndKubernetesResource(tResource, kubeResource)
		if !equal {
			t.Logf("Kubernetes and Teleport resources not sync-ed yet: %s", diff)
		}
		assert.True(c, equal)
	})

	// Updating the resource in Kubernetes
	// The modification can fail because of a conflict with the resource controller. We retry if that happens.
	err = retry.RetryOnConflict(retry.DefaultRetry, func() error {
		return test.ModifyKubernetesResource(ctx, resourceName)
	})
	require.NoError(t, err)

	// Check the resource was updated in Teleport
	FastEventuallyWithT(t, func(c *assert.CollectT) {
		kubeResource, err := test.GetKubernetesResource(ctx, resourceName)
		require.NoError(c, err)

		tResource, err := test.GetTeleportResource(ctx, resourceName)
		require.NoError(c, err)

		// Kubernetes and Teleport resources are in-sync
		equal, diff := test.CompareTeleportAndKubernetesResource(tResource, kubeResource)
		if !equal {
			t.Logf("Kubernetes and Teleport resources not sync-ed yet: %s", diff)
		}
		assert.True(c, equal)
	})

	// Delete the resource to avoid leftover state.
	err = test.DeleteTeleportResource(ctx, resourceName)
	require.NoError(t, err)
}
