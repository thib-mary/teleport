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

import React, { useEffect, useCallback, useRef } from 'react';

import {
  ButtonPrimary,
  ButtonSecondary,
  Flex,
  Indicator,
  Text,
  Link,
} from 'design';
import * as Icons from 'design/Icon';
import { useAsync } from 'shared/hooks/useAsync';
import { MenuLogin } from 'shared/components/MenuLogin';
import * as connectMyComputer from 'shared/connectMyComputer';

import cfg from 'teleport/config';
import useTeleport from 'teleport/useTeleport';
import {
  ActionButtons,
  StyledBox,
  Header,
  TextIcon,
} from 'teleport/Discover/Shared';
import { sortNodeLogins } from 'teleport/UnifiedResources/ResourceActionButton';
import { openNewTab } from 'teleport/lib/util';
import { Node } from 'teleport/services/nodes';
import { ApiError } from 'teleport/services/api/parseError';

import { NodeMeta } from '../../useDiscover';

import type { AgentStepProps } from '../../types';

export const TestConnection = (props: AgentStepProps) => {
  const { userService, storeUser } = useTeleport();
  const meta = props.agentMeta as NodeMeta;

  const abortController = useRef<AbortController>();
  // When the user sets up Connect My Computer in Teleport Connect, a new role gets added to the
  // user. Because of that, we need to reload the current session so that the user is able to
  // connect to the new node, without having to log in to the cluster again.
  //
  // We also need to fetch the list of logins from that role. The user might have many logins
  // available, but the Connect My Computer agent is always started by the system user that is
  // running Connect. As such, the Connect My Computer role should include that valid login.
  const [fetchLoginsAttempt, fetchLogins] = useAsync(
    useCallback(
      async (signal: AbortSignal) => {
        await userService.reloadUser(signal);

        return await userService.fetchConnectMyComputerLogins(signal);
      },
      [userService]
    )
  );

  useEffect(() => {
    abortController.current = new AbortController();

    if (fetchLoginsAttempt.status === '') {
      fetchLogins(abortController.current.signal);
    }

    return () => {
      abortController.current.abort();
    };
  }, []);

  return (
    <Flex flexDirection="column" alignItems="flex-start" mb={2} gap={4}>
      <div>
        <Header>Start a Session</Header>
      </div>

      <StyledBox>
        <Text bold>Step 1: Connect to Your Computer</Text>
        <Text typography="subtitle1" mb={2}>
          Optionally verify that you can connect to &ldquo;
          {meta.resourceName}
          &rdquo; by starting a session.
        </Text>
        {fetchLoginsAttempt.status === '' ||
          (fetchLoginsAttempt.status === 'processing' && <Indicator />)}

        {fetchLoginsAttempt.status === 'error' &&
          (fetchLoginsAttempt.error instanceof ApiError &&
          fetchLoginsAttempt.error.response.status === 404 ? (
            <ErrorWithinStep
              buttonText="Reload"
              buttonOnClick={() => window.location.reload()}
            >
              <>
                For Connect My Computer to work, the role{' '}
                {connectMyComputer.getRoleNameForUser(storeUser.getUsername())}{' '}
                must be assigned to you. Reload this page to repeat the process
                of enrolling a new resource and then{' '}
                <Link
                  href="https://goteleport.com/docs/connect-your-client/teleport-connect/#restarting-the-setup"
                  target="_blank"
                >
                  restart the Connect My Computer setup
                </Link>{' '}
                in Teleport Connect.
              </>
            </ErrorWithinStep>
          ) : (
            <ErrorWithinStep
              buttonText="Retry"
              buttonOnClick={() => fetchLogins(abortController.current.signal)}
            >
              <>Encountered Error: {fetchLoginsAttempt.statusText}</>
            </ErrorWithinStep>
          ))}

        {fetchLoginsAttempt.status === 'success' &&
          (fetchLoginsAttempt.data.length > 0 ? (
            <ConnectButton logins={fetchLoginsAttempt.data} node={meta.node} />
          ) : (
            <ErrorWithinStep
              buttonText="Reload"
              buttonOnClick={() => window.location.reload()}
            >
              <>
                The role{' '}
                {connectMyComputer.getRoleNameForUser(storeUser.getUsername())}{' '}
                does not contain any logins. It has likely been manually edited.
                Reload this page to repeat the process of enrolling a new
                resource and then{' '}
                <Link
                  href="https://goteleport.com/docs/connect-your-client/teleport-connect/#restarting-the-setup"
                  target="_blank"
                >
                  restart the Connect My Computer setup
                </Link>{' '}
                in Teleport Connect.
              </>
            </ErrorWithinStep>
          ))}
      </StyledBox>

      <ActionButtons
        onProceed={props.nextStep}
        disableProceed={fetchLoginsAttempt.status !== 'success'}
        lastStep={true}
        // onPrev is not passed on purpose to disable the back button. The flow would go back to
        // polling which wouldn't make sense as the user has already connected their computer so the
        // step would poll forever, unless the user removed the agent and configured it again.
      />
    </Flex>
  );
};

const ErrorWithinStep = (props: {
  buttonText: string;
  buttonOnClick: () => void;
  children: React.ReactNode;
}) => (
  <>
    <TextIcon mt={2} mb={3}>
      <Icons.Warning size="medium" ml={1} mr={2} color="error.main" />
      <Text>{props.children}</Text>
    </TextIcon>

    <ButtonPrimary type="button" onClick={props.buttonOnClick}>
      {props.buttonText}
    </ButtonPrimary>
  </>
);

const ConnectButton = ({ logins, node }: { logins: string[]; node: Node }) => {
  if (logins.length === 1) {
    return (
      <ButtonSecondary
        as="a"
        target="_blank"
        href={cfg.getSshConnectRoute({
          clusterId: node.clusterId,
          serverId: node.id,
          login: logins[0],
        })}
      >
        Connect
      </ButtonSecondary>
    );
  }

  return (
    <MenuLogin
      textTransform="uppercase"
      alignButtonWidthToMenu
      getLoginItems={() => {
        return sortNodeLogins(logins).map(login => ({
          login,
          url: cfg.getSshConnectRoute({
            clusterId: node.clusterId,
            serverId: node.id,
            login,
          }),
        }));
      }}
      onSelect={(event, login) => {
        event.preventDefault();
        openNewTab(
          cfg.getSshConnectRoute({
            clusterId: node.clusterId,
            serverId: node.id,
            login,
          })
        );
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
    />
  );
};
