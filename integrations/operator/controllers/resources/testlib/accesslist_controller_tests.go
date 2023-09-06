/*
Copyright 2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package testlib

import (
	"context"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/gravitational/trace"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	kclient "sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/gravitational/teleport/api/client"
	"github.com/gravitational/teleport/api/types"
	"github.com/gravitational/teleport/api/types/accesslist"
	"github.com/gravitational/teleport/api/types/header"
	"github.com/gravitational/teleport/api/types/trait"
	resourcesv1 "github.com/gravitational/teleport/integrations/operator/apis/resources/v1"
)

var accessListSpec = accesslist.Spec{
	Title:       "crane operation",
	Description: "Access list that Gru uses to allow the minions to operate the crane.",
	Owners:      []accesslist.Owner{{Name: "Gru", Description: "The super villain."}},
	Audit: accesslist.Audit{
		Recurrence: accesslist.Recurrence{
			Frequency:  accesslist.SixMonths,
			DayOfMonth: accesslist.FirstDayOfMonth,
		},
		NextAuditDate: time.Now().Add(24 * time.Hour),
	},
	MembershipRequires: accesslist.Requires{
		Roles:  []string{"minion"},
		Traits: trait.Traits{},
	},
	OwnershipRequires: accesslist.Requires{
		Roles:  []string{"supervillain"},
		Traits: trait.Traits{},
	},
	Grants: accesslist.Grants{
		Roles:  []string{"crane-operator"},
		Traits: trait.Traits{},
	},
}

type accessListTestingPrimitives struct {
	setup *TestSetup
}

func (g *accessListTestingPrimitives) Init(setup *TestSetup) {
	g.setup = setup
}

func (g *accessListTestingPrimitives) SetupTeleportFixtures(ctx context.Context) error {
	return nil
}

func (g *accessListTestingPrimitives) CreateTeleportResource(ctx context.Context, name string) error {
	metadata := header.Metadata{
		Name: name,
	}
	accessList, err := accesslist.NewAccessList(metadata, accessListSpec)
	if err != nil {
		return trace.Wrap(err)
	}
	if err := accessList.CheckAndSetDefaults(); err != nil {
		return trace.Wrap(err)
	}
	accessList.SetOrigin(types.OriginKubernetes)
	_, err = g.setup.TeleportClient.AccessListClient().UpsertAccessList(ctx, accessList)
	return trace.Wrap(err)
}

func (g *accessListTestingPrimitives) GetTeleportResource(ctx context.Context, name string) (*accesslist.AccessList, error) {
	al, err := g.setup.TeleportClient.AccessListClient().GetAccessList(ctx, name)
	return al, trace.Wrap(err)
}

func (g *accessListTestingPrimitives) DeleteTeleportResource(ctx context.Context, name string) error {
	return trace.Wrap(g.setup.TeleportClient.AccessListClient().DeleteAccessList(ctx, name))
}

func (g *accessListTestingPrimitives) CreateKubernetesResource(ctx context.Context, name string) error {
	accessList := &resourcesv1.TeleportAccessList{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: g.setup.Namespace.Name,
		},
		Spec: resourcesv1.TeleportAccessListSpec(accessListSpec),
	}
	return trace.Wrap(g.setup.K8sClient.Create(ctx, accessList))
}

func (g *accessListTestingPrimitives) DeleteKubernetesResource(ctx context.Context, name string) error {
	accessList := &resourcesv1.TeleportAccessList{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: g.setup.Namespace.Name,
		},
	}
	return trace.Wrap(g.setup.K8sClient.Delete(ctx, accessList))
}

func (g *accessListTestingPrimitives) GetKubernetesResource(ctx context.Context, name string) (*resourcesv1.TeleportAccessList, error) {
	accessList := &resourcesv1.TeleportAccessList{}
	obj := kclient.ObjectKey{
		Name:      name,
		Namespace: g.setup.Namespace.Name,
	}
	err := g.setup.K8sClient.Get(ctx, obj, accessList)
	return accessList, trace.Wrap(err)
}

func (g *accessListTestingPrimitives) ModifyKubernetesResource(ctx context.Context, name string) error {
	accessList, err := g.GetKubernetesResource(ctx, name)
	if err != nil {
		return trace.Wrap(err)
	}
	accessList.Spec.Grants.Roles = []string{"crane-operator", "forklift-operator"}
	return trace.Wrap(g.setup.K8sClient.Update(ctx, accessList))
}

func (g *accessListTestingPrimitives) CompareTeleportAndKubernetesResource(tResource *accesslist.AccessList, kubeResource *resourcesv1.TeleportAccessList) (bool, string) {
	diff := cmp.Diff(
		tResource,
		kubeResource.ToTeleport(),
		cmpopts.IgnoreFields(header.Metadata{}, "ID", "Labels"),
		cmpopts.IgnoreFields(header.ResourceHeader{}, "Kind"),
	)
	return diff == "", diff
}

func AccessListCreationTest(t *testing.T, clt *client.Client) {
	test := &accessListTestingPrimitives{}
	ResourceCreationTest[*accesslist.AccessList, *resourcesv1.TeleportAccessList](t, test, WithTeleportClient(clt))
}

func AccessListDeletionDriftTest(t *testing.T, clt *client.Client) {
	test := &accessListTestingPrimitives{}
	ResourceDeletionDriftTest[*accesslist.AccessList, *resourcesv1.TeleportAccessList](t, test, WithTeleportClient(clt))
}

func AccessListUpdateTest(t *testing.T, clt *client.Client) {
	test := &accessListTestingPrimitives{}
	ResourceUpdateTest[*accesslist.AccessList, *resourcesv1.TeleportAccessList](t, test, WithTeleportClient(clt))
}
