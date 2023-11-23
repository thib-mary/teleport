/**
 * Copyright 2023 Gravitational, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useMemo } from 'react';

import * as connectMyComputer from 'shared/connectMyComputer';

import { useWorkspaceContext } from 'teleterm/ui/Documents';
import { useAppContext } from 'teleterm/ui/appContextProvider';

export function useAgentProperties(): {
  systemUsername: string;
  hostname: string;
  roleName: string;
  clusterName: string;
} {
  const { rootClusterUri } = useWorkspaceContext();
  const { clustersService, mainProcessClient } = useAppContext();
  const cluster = clustersService.findCluster(rootClusterUri);
  const { username: systemUsername, hostname } = useMemo(
    () => mainProcessClient.getRuntimeSettings(),
    [mainProcessClient]
  );

  return {
    systemUsername,
    hostname,
    roleName: cluster.loggedInUser
      ? connectMyComputer.getRoleNameForUser(cluster.loggedInUser.name)
      : '',
    clusterName: cluster.name,
  };
}
