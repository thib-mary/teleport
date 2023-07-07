import React from 'react';
import { useTheme } from 'styled-components';
import { Box, Card, Flex, Text, Link } from 'design';
import { DevicesIcon } from 'design/SVGIcon';

export const TrustedDevice = () => {
  const theme = useTheme();
  return (
    <Card maxWidth="700px" p={4} as={Flex} alignItems="center">
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
    </Card>
  );
};
