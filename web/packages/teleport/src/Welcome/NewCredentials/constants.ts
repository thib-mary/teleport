import { NewPassword } from 'teleport/Welcome/NewCredentials/NewPassword';
import { NewMfaDevice } from 'teleport/Welcome/NewCredentials/NewMfaDevice';
import { NewPasswordlessDevice } from 'teleport/Welcome/NewCredentials/NewPasswordlessDevice';

export const loginFlows = {
  local: [NewPassword, NewMfaDevice],
  passwordless: [NewPasswordlessDevice],
};
