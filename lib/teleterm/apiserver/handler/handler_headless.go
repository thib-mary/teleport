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

package handler

import (
	"context"

	"github.com/gravitational/trace"

	api "github.com/gravitational/teleport/gen/proto/go/teleport/lib/teleterm/v1"
)

// UpdateHeadlessAuthenticationState logs in a user to a cluster
func (s *Handler) UpdateHeadlessAuthenticationState(ctx context.Context, req *api.UpdateHeadlessAuthenticationStateRequest) (*api.UpdateHeadlessAuthenticationStateResponse, error) {
	if err := s.DaemonService.UpdateHeadlessAuthenticationState(ctx, req.RootClusterUri, req.HeadlessAuthenticationId, req.State); err != nil {
		return nil, trace.Wrap(err)
	}

	return &api.UpdateHeadlessAuthenticationStateResponse{}, nil
}
