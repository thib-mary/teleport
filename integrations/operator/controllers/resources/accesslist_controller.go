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

package resources

import (
	"context"

	"github.com/gravitational/trace"
	kclient "sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/gravitational/teleport/api/types/accesslist"
	resourcesv1 "github.com/gravitational/teleport/integrations/operator/apis/resources/v1"
	"github.com/gravitational/teleport/integrations/operator/sidecar"
)

// accessListClient implements TeleportResourceClient and offers CRUD methods needed to reconcile access_lists.
type accessListClient struct {
	TeleportClientAccessor sidecar.ClientAccessor
}

// Get gets the Teleport access_list of a given name
func (r accessListClient) Get(ctx context.Context, name string) (*accesslist.AccessList, error) {
	teleportClient, err := r.TeleportClientAccessor(ctx)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	accessList, err := teleportClient.AccessListClient().GetAccessList(ctx, name)
	return accessList, trace.Wrap(err)
}

// Create creates a Teleport access_list
func (r accessListClient) Create(ctx context.Context, accessList *accesslist.AccessList) error {
	teleportClient, err := r.TeleportClientAccessor(ctx)
	if err != nil {
		return trace.Wrap(err)
	}
	_, err = teleportClient.AccessListClient().UpsertAccessList(ctx, accessList)
	return trace.Wrap(err)
}

// Update updates a Teleport access_list
func (r accessListClient) Update(ctx context.Context, accessList *accesslist.AccessList) error {
	teleportClient, err := r.TeleportClientAccessor(ctx)
	if err != nil {
		return trace.Wrap(err)
	}

	_, err = teleportClient.AccessListClient().UpsertAccessList(ctx, accessList)
	return trace.Wrap(err)
}

// Delete deletes a Teleport access_list
func (r accessListClient) Delete(ctx context.Context, name string) error {
	teleportClient, err := r.TeleportClientAccessor(ctx)
	if err != nil {
		return trace.Wrap(err)
	}

	return trace.Wrap(teleportClient.AccessListClient().DeleteAccessList(ctx, name))
}

// NewAccessListReconciler instantiates a new Kubernetes controller reconciling access_list resources
func NewAccessListReconciler(client kclient.Client, accessor sidecar.ClientAccessor) *TeleportResourceReconciler[*accesslist.AccessList, *resourcesv1.TeleportAccessList] {
	accessListClient := &accessListClient{
		TeleportClientAccessor: accessor,
	}

	resourceReconciler := NewTeleportResourceReconciler[*accesslist.AccessList, *resourcesv1.TeleportAccessList](
		client,
		accessListClient,
	)

	return resourceReconciler
}
