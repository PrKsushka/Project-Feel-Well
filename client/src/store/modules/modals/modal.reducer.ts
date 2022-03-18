import { Action } from '../../types';
import { LOGIN_MODAL_ACTIVATION, REGISTRATION_MODAL_ACTIVATION } from './modal.constants';

const initialState = {
  loginModal: false,
  registrationModal: false,
};
const ModalReducer = (state = initialState, action: Action = { type: 'DEFAULT' }) => {
  switch (action.type) {
    case LOGIN_MODAL_ACTIVATION:
      return {
        ...state,
        loginModal: action.payload,
      };
    case REGISTRATION_MODAL_ACTIVATION:
      return {
        ...state,
        registrationModal: action.payload,
      };
    default:
      return state;
  }
};
export default ModalReducer;
