import { CREATE_DIRECTORY_MODAL_ACTIVATION, LOGIN_MODAL_ACTIVATION, REGISTRATION_MODAL_ACTIVATION } from './modal.constants';

export function loginModalActivation(param: boolean) {
  return {
    type: LOGIN_MODAL_ACTIVATION,
    payload: param,
  };
}

export function registrationModalActivation(param: boolean) {
  return {
    type: REGISTRATION_MODAL_ACTIVATION,
    payload: param,
  };
}

export function createDirectoryModalActivation(param: boolean) {
  return {
    type: CREATE_DIRECTORY_MODAL_ACTIVATION,
    payload: param,
  };
}