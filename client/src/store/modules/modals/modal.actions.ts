import {
  CHANGE_DATA_ABOUT_USER_MODAL_ACTIVATION,
  CHANGE_PASSWORD_MODAL_ACTIVATION,
  CLOSE_MODAL,
  CREATE_DIRECTORY_MODAL_ACTIVATION,
  LOGIN_MODAL_ACTIVATION,
  OPEN_POP_UP,
  PLACES_DETAILS_MODAL_ACTIVATION,
  REGISTRATION_MODAL_ACTIVATION,
} from './modal.constants';

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

export function openPopUp(param: boolean) {
  return {
    type: OPEN_POP_UP,
    payload: param,
  };
}

export function placesDetailsModalActivation(value: boolean) {
  return {
    type: PLACES_DETAILS_MODAL_ACTIVATION,
    payload: value,
  };
}

export function changeDataAboutUserModalActivation(val: boolean) {
  return {
    type: CHANGE_DATA_ABOUT_USER_MODAL_ACTIVATION,
    payload: val,
  };
}

export function changePasswordModalActivation(val: boolean) {
  return {
    type: CHANGE_PASSWORD_MODAL_ACTIVATION,
    payload: val,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
