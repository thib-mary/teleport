/*
Copyright 2023 Gravitational, Inc.

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

import React from 'react';
import { Text, Box, Flex, Link, ButtonPrimary } from 'design';
import Image from 'design/Image';

import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';

import emptyPng from './pdticon2.png';


export function ClusterRecommendations() {


  return (
    <FeatureBox>
      <FeatureHeader alignItems="center">
        <FeatureHeaderTitle>Cluster Security</FeatureHeaderTitle>
      </FeatureHeader>
        <Flex alignItems="start">
          <Info
            ml="6"
            width="300px"
            color="text.main"
            style={{ flexShrink: 0 }}
          />
          <Cta
            ml="4"
            color="text.main"
            style={{ flexShrink: 0 }}
          />
        </Flex>

    </FeatureBox>
  );
}

const Info = props => (
  <Box {...props}>
    <Text typography="h6" mb={3}>
      Enable Device Trust
    </Text>
    <Text typography="subtitle1" mb={3}>
      Device Trust authenticates and establishes device identity before access. Device Trust adds additional dimension to secure access
      by authenticating user device before access, enabling zero trust.
    </Text>
    <Text typography="subtitle1">
          Learn more about {' '}
          <Link
            color="text.main"
            href="https://goteleport.com/docs/access-controls/guides/device-trust/"
            target="_blank"
          >
            Teleport Device Trust.
          </Link>{' '}
        </Text>
  </Box>
);

const Cta = (props: any) => {
  return (
    <Box {...props}>
      <Box mx="4">
        <Image width="230px" src={emptyPng} />
      </Box>
      <Box>
      <ButtonPrimary
          mb="2"
          mx="7"
          mt={2}
        >
          Unlock Device Trust
        </ButtonPrimary>
      </Box>
    </Box>
  );
};