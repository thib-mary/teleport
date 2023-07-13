import React from 'react';
import { Box, Flex, Text } from 'design';
import Image from 'design/Image';

import emptyPng from './pdticon2.png';

export const TrustedDevice = () => {
  return (
    <Flex alignItems="start">
    <Info
      ml="4"
      width="240px"
      color="text.main"
      style={{ flexShrink: 0 }}
    />
    <Cta
      ml="10"
      color="text.main"
      style={{ flexShrink: 0 }}
    />
  </Flex>
  );
};

const Info = props => (
  <Box {...props}>
    <Text typography="h6" mb={3}>
    Enroll Your Device
    </Text>
    <Text typography="subtitle1" mb={3}>
      Enrolling your device enables authenticated device access to protected resources,
      adding additional security.
    </Text>
    <Text typography="subtitle1">
      If your cluster is configured with Device Trust, you won't be able to access resources protected with Device Trust.
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
      <Text typography="h6" mb={3} textAlign="center">
    Contact cluster administrator <br /> to register your Device.
    </Text>
      </Box>
    </Box>
  );
};
