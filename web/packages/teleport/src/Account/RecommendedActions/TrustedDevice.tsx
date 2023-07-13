import React from 'react';
import { useTheme } from 'styled-components';
import { Box, Card, Flex, Text, Link, ButtonPrimary } from 'design';
import Image from 'design/Image';

import emptyPng from './pdticon2.png';

export const TrustedDevice = () => {
  const theme = useTheme();
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
      Trusted Device Access authenticates user devices, establishing device identity for access.
    </Text>
    <Text typography="subtitle1">
          Read Device Trust to learn more about  {' '}
          <Link
            color="text.main"
            href="https://goteleport.com/docs/access-controls/guides/device-trust/"
            target="_blank"
          >
            Teleport Trusted Device Access.
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
          mx="8"
          mt={2}
          size="small"
        >
          Unlock Device Trust
        </ButtonPrimary>
      </Box>
    </Box>
  );
};


{/* <Card maxWidth="700px" p={4} as={Flex} alignItems="center">
<Box style={{ textAlign: 'center' }} mr={5}>
  <DevicesIcon size={150} fill={theme.colors.spotBackground[2]} />
</Box>

<Box>
  <Text typography="h6" mb={3} caps>
    Authenticated Device Access
  </Text>
  <Text typography="subtitle1" mb={3}>
    Lockdown your account with Teleport trusted device. When you enable device authentication,
    Teleport.
  </Text>
  <Text typography="subtitle1">
    Read our to learn more about  {' '}
    <Link
      color="text.main"
      href="https://goteleport.com/docs/access-controls/guides/device-trust/"
      target="_blank"
    >
      Teleport Device Trust.
    </Link>{' '}
  </Text>
</Box>
</Card> */}