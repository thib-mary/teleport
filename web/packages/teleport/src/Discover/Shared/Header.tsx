/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

import { ArrowBack } from 'design/Icon';
import { Text, ButtonIcon, Flex } from 'design';

export const Header: React.FC = ({ children }) => (
  <Text my={1} fontSize={makePx(4.5)} bold>
    {children}
  </Text>
);

export const HeaderSubtitle: React.FC = ({ children }) => (
  <Text mb={5}>{children}</Text>
);

export const HeaderWithBackBtn: React.FC<{ onPrev(): void }> = ({
  children,
  onPrev,
}) => (
  <Flex alignItems="center">
    <ButtonIcon size={1} title="Go Back" onClick={onPrev} ml={-2}>
      <ArrowBack size="large" />
    </ButtonIcon>
    <Text my={1} fontSize={makePx(4.5)} bold>
      {children}
    </Text>
  </Flex>
);
