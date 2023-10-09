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

package unifiedresources

import (
	"context"

	"github.com/gravitational/trace"

	"github.com/gravitational/teleport/api/client/proto"
	"github.com/gravitational/teleport/lib/teleterm/clusters"
)

func List(ctx context.Context, cluster *clusters.Cluster, client Client, req *proto.ListUnifiedResourcesRequest) (*ListResponse, error) {
	unifiedResourcesResponse, err := client.ListUnifiedResources(ctx, req)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	response := &ListResponse{
		NextKey: unifiedResourcesResponse.NextKey,
	}

	for _, unifiedResource := range unifiedResourcesResponse.Resources {
		switch e := unifiedResource.GetResource().(type) {
		case *proto.PaginatedResource_Node:
			response.Resources = append(response.Resources, CombinedResource{
				Server: &clusters.Server{
					URI:    cluster.URI.AppendServer(e.Node.GetName()),
					Server: e.Node,
				},
			})
		case *proto.PaginatedResource_DatabaseServer:
			response.Resources = append(response.Resources, CombinedResource{
				Database: &clusters.Database{
					URI:      cluster.URI.AppendDB(e.DatabaseServer.GetName()),
					Database: e.DatabaseServer.GetDatabase(),
				},
			})
		case *proto.PaginatedResource_KubeCluster:
			response.Resources = append(response.Resources, CombinedResource{
				Kube: &clusters.Kube{
					URI:               cluster.URI.AppendKube(e.KubeCluster.GetName()),
					KubernetesCluster: e.KubeCluster,
				},
			})
		}
	}

	return response, nil
}

// Client represents auth.ClientI methods used by [List].
// During a normal operation, auth.ClientI is passed as this interface.
type Client interface {
	// See auth.ClientI.ListUnifiedResources.
	ListUnifiedResources(ctx context.Context, req *proto.ListUnifiedResourcesRequest) (*proto.ListUnifiedResourcesResponse, error)
}

type ListResponse struct {
	Resources []CombinedResource
	NextKey   string
}

// CombinedResource combines all resource types into a single struct.
// Only one filed should be set at a time.
type CombinedResource struct {
	Server   *clusters.Server
	Database *clusters.Database
	Kube     *clusters.Kube
}
