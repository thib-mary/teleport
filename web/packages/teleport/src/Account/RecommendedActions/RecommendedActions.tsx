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

import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';

import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';

import {
  Text,
  Flex,
  Image,
  ButtonPrimary,
  ButtonSecondary,
  Link,
  Indicator,
  Box,
} from 'design';

// import { generateCommand } from 'teleport/Discover/Shared/generateCommand';
import cfg from 'teleport/config';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { ActionButtons, Step, Header } from 'teleport/Discover/Shared';

import { TrustedDevice } from './TrustedDevice';

// export default function Container() {
//   return <ChangePassword {...state} />;
// }

export function RecommendedActions() {
  const [open, setOpen] = React.useState(false);
  const [step2Open, setStep2Open] = React.useState(false);
  const [step1, setStep1] = React.useState(true);

  return (
    <FeatureBox style={{ padding: 0 }}>
      <FeatureHeader border="none">
        {/* <FeatureHeaderTitle>Recommendations to secure your account</FeatureHeaderTitle> */}
        <FeatureHeaderTitle> Your access is at risk!</FeatureHeaderTitle>
      </FeatureHeader>
      <TrustedDevice setOpen={setOpen} />
      <RegisterAndEnrol
        open={open}
        step1={step1}
        setStep1={setStep1}
        setOpen={setOpen}
      />
    </FeatureBox>
  );
}

function RegisterAndEnrol(props: any) {
function onClose() {
  props.setOpen(false)
  props.setStep1(true)
}

  return (
    <Dialog
      dialogCss={() => ({ minWidth: '900px' })}
      disableEscapeKeyDown={false}
      open={props.open}
    >
      <DialogHeader style={{ flexDirection: 'column' }}>
        <DialogTitle>Enrol Device</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {props.step1 ? (
          <Box>
            <Header>Register Device</Header>

            <Text mb={4}>
              First, you need to grab asset tag (serial key) of your device.
              Then, use tctl to register that device.
            </Text>
            {getSteps(registerDevice)}
          </Box>
        ) : (
          <Box>
            <Header>Enrol Device</Header>

            <Text mb={4}>
              Use enrol token from previous step to enrol your device.
            </Text>

            {/* {getSteps(props.step1? registerDevice: enrolSevice)} */}
            {getSteps(enrolSevice)}
            {/* <ActionButtons
            onProceed={() => props.setStep1(false)}
            onPrev={props.prevStep}
          /> */}
          </Box>
        )}
      </DialogContent>
      <DialogFooter>
        <ButtonPrimary
          size="large"
          onClick={() => props.setStep1(false)}
          mr={3}
        >
          Next
        </ButtonPrimary>
        <ButtonSecondary size="large" onClick={() => onClose()}>
          Cancel
        </ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

function getSteps(steps: Step[]) {
  return steps.map((step, index) => (
    <Step
      key={index}
      stepNumber={index + 1}
      title={step.title}
      text={step.command}
    />
  ));
}

interface Step {
  title: string;
  command: string;
}

const registerDevice: Step[] = [
  {
    title: 'Find your device asset tag (serial key)',
    command: generateCommand(),
  },
  {
    title: 'Enrol Device',
    command: `tctl devices add --os=macos --asset_tag=<asset tag from Step 1> --enroll`,
  },
];

export function generateCommand() {
  return `ioreg -c IOPlatformExpertDevice -d 2 | grep -i IOPlatformSerialNumber | awk -F'"' '{print $4}'`;
}

const enrolSevice: Step[] = [
  {
    title: 'Enrol Device',
    command: `tsh device enroll --token=<enrol token from previous step>`,
  },
];
