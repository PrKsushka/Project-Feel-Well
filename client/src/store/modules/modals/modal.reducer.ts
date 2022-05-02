import { Action } from '../../types';
import {
  CREATE_DIRECTORY_MODAL_ACTIVATION,
  LOGIN_MODAL_ACTIVATION,
  OPEN_POP_UP,
  PLACES_DETAILS_MODAL_ACTIVATION,
  REGISTRATION_MODAL_ACTIVATION
} from './modal.constants';

const initialState = {
  loginModal: false,
  registrationModal: false,
  createDirectoryModal: false,
  openPopUp: false,
  placesDetails: false
};
const ModalReducer = (state = initialState, action: Action = { type: 'DEFAULT' }) => {
  switch (action.type) {
    case LOGIN_MODAL_ACTIVATION:
      return {
        ...state,
        loginModal: action.payload,
        registrationModal: false,
      };
    case REGISTRATION_MODAL_ACTIVATION:
      return {
        ...state,
        registrationModal: action.payload,
        loginModal: false,
      };
    case CREATE_DIRECTORY_MODAL_ACTIVATION:
      return {
        ...state,
        createDirectoryModal: action.payload,
        loginModal: false,
        registrationModal: false,
      };
    case OPEN_POP_UP: {
      return {
        ...state,
        openPopUp: action.payload,
      };
    }
    case PLACES_DETAILS_MODAL_ACTIVATION: {
      return {
        ...state,
        placesDetails: action.payload
      }
    }
    default:
      return state;
  }
};
export default ModalReducer;
