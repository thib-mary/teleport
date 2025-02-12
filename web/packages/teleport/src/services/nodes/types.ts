/*
Copyright 2015-2022 Gravitational, Inc.

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
import { NodeSubKind } from 'shared/services';

import { ResourceLabel } from 'teleport/services/agents';

import { Regions } from '../integrations';

export interface Node {
  kind: 'node';
  id: string;
  clusterId: string;
  hostname: string;
  labels: ResourceLabel[];
  addr: string;
  tunnel: boolean;
  subKind: NodeSubKind;
  sshLogins: string[];
  awsMetadata?: AwsMetadata;
}

export interface BashCommand {
  text: string;
  expires: string;
}

export type AwsMetadata = {
  accountId: string;
  instanceId: string;
  region: Regions;
  vpcId: string;
  integration: string;
  subnetId: string;
};

export type CreateNodeRequest = {
  name: string;
  subKind: string;
  hostname: string;
  addr: string;
  labels?: ResourceLabel[];
  aws?: AwsMetadata;
};
