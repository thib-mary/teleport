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
import { fireEvent, render, screen } from 'design/utils/testing';

import { ContextProvider } from 'teleport';

import { createTeleportContext } from 'teleport/mocks/contexts';

import { SessionJoinBtn } from './SessionJoinBtn';

test('all participant modes are properly listed and in the correct order', () => {
  const ctx = createTeleportContext();

  render(
    <ContextProvider ctx={ctx}>
      <SessionJoinBtn
        sid={'4b038eda-ddca-5533-9a49-3a34f133b5f4'}
        clusterId={'test-cluster'}
        participantModes={['moderator', 'peer', 'observer']}
        showCTA={false}
        showModeratedCTA={false}
      />
    </ContextProvider>
  );

  const joinBtn = screen.queryByText(/Join/i);
  expect(joinBtn).toBeInTheDocument();

  fireEvent.click(joinBtn);

  // Make sure that the join URL is correct.
  expect(screen.queryByText('As an Observer').closest('a')).toHaveAttribute(
    'href',
    '/web/cluster/test-cluster/console/session/4b038eda-ddca-5533-9a49-3a34f133b5f4?mode=observer'
  );
  expect(screen.queryByText('As a Moderator').closest('a')).toHaveAttribute(
    'href',
    '/web/cluster/test-cluster/console/session/4b038eda-ddca-5533-9a49-3a34f133b5f4?mode=moderator'
  );
  expect(screen.queryByText('As a Peer').closest('a')).toHaveAttribute(
    'href',
    '/web/cluster/test-cluster/console/session/4b038eda-ddca-5533-9a49-3a34f133b5f4?mode=peer'
  );

  // Make sure that the menu items are in the order of observer -> moderator -> peer.
  const menuItems = screen.queryAllByRole<HTMLAnchorElement>('link');
  expect(menuItems).toHaveLength(3);
  expect(menuItems[0]).toHaveTextContent('As an Observer');
  expect(menuItems[1]).toHaveTextContent('As a Moderator');
  expect(menuItems[2]).toHaveTextContent('As a Peer');

  expect(
    screen.queryByText('Join Active Sessions with Teleport Enterprise')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('Join as a moderator with Teleport Enterprise')
  ).not.toBeInTheDocument();
});

test('showCTA does not render a join link for any sessions', () => {
  const ctx = createTeleportContext();
  render(
    <ContextProvider ctx={ctx}>
      <SessionJoinBtn
        sid={'4b038eda-ddca-5533-9a49-3a34f133b5f4'}
        clusterId={'test-cluster'}
        participantModes={['moderator', 'peer', 'observer']}
        showCTA={true}
        showModeratedCTA={false}
      />
    </ContextProvider>
  );

  const joinBtn = screen.queryByText(/Join/i);
  expect(joinBtn).toBeInTheDocument();

  fireEvent.click(joinBtn);

  expect(screen.queryByText('As an Observer').closest('a')).toBeNull();
  expect(screen.queryByText('As a Moderator').closest('a')).toBeNull();
  expect(screen.queryByText('As a Peer').closest('a')).toBeNull();

  expect(
    screen.getByText('Join Active Sessions with Teleport Enterprise')
  ).toBeInTheDocument();
});

test('showModeratedCTA does not render a join link for moderated sessions', () => {
  const ctx = createTeleportContext();
  render(
    <ContextProvider ctx={ctx}>
      <SessionJoinBtn
        sid={'4b038eda-ddca-5533-9a49-3a34f133b5f4'}
        clusterId={'test-cluster'}
        participantModes={['moderator', 'peer', 'observer']}
        showCTA={false}
        showModeratedCTA={true}
      />
    </ContextProvider>
  );

  const joinBtn = screen.queryByText(/Join/i);
  expect(joinBtn).toBeInTheDocument();

  fireEvent.click(joinBtn);

  expect(screen.queryByText('As an Observer').closest('a')).toHaveAttribute(
    'href',
    '/web/cluster/test-cluster/console/session/4b038eda-ddca-5533-9a49-3a34f133b5f4?mode=observer'
  );
  expect(screen.queryByText('As a Moderator').closest('a')).toBeNull();
  expect(screen.queryByText('As a Peer').closest('a')).toHaveAttribute(
    'href',
    '/web/cluster/test-cluster/console/session/4b038eda-ddca-5533-9a49-3a34f133b5f4?mode=peer'
  );

  expect(
    screen.getByText('Join as a moderator with Teleport Enterprise')
  ).toBeInTheDocument();
});
