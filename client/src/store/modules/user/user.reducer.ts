import { Action, UserReducer } from '../../types';
import { USER_AUTHENTICATED, USER_REGISTERED, USER_UNAUTHENTICATED, USER_UNREGISTERED } from './user.constants';

const initialState: UserReducer = {
  auth: false,
  register: false,
  successAuth: '',
  failedAuth: '',
};

const userReducer = (state = initialState, action: Action = { type: 'DEFAULT' }) => {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return {
        ...state,
        auth: true,
        successAuth: 'user auth successfully',
        failedAuth: '',
      };
    case USER_UNAUTHENTICATED:
      return {
        ...state,
        auth: false,
        failedAuth: action.payload,
        successAuth: '',
      };
    case USER_REGISTERED:
      return {
        ...state,
        register: true,
        successAuth: 'user registered successfully',
        failedAuth: '',
      };
    case USER_UNREGISTERED:
      return {
        ...state,
        register: false,
        failedAuth: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
