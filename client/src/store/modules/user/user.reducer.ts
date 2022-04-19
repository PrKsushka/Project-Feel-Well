import { Action, DataAboutUser, UserReducer } from '../../types';
import { USER_AUTHENTICATED, USER_REGISTERED, USER_UNAUTHENTICATED, USER_UNREGISTERED } from './user.constants';

const initialState: UserReducer = {
  auth: false,
  register: false,
  successAuth: '',
  failedAuth: '',
  dataAboutUser: {
    firstName: '',
    lastName: '',
  }
};
type UserAction = {
  type: string,
  payload?: DataAboutUser
}
const userReducer = (state = initialState, action: UserAction = { type: 'DEFAULT' }) => {
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
        successAuth: ''
      };
    case USER_REGISTERED:
      return {
        ...state,
        register: true,
        successAuth: 'user registered successfully',
        failedAuth: '',
        dataAboutUser: {
          firstName: action.payload?.firstName,
          lastName: action.payload?.lastName
        },
      };
    case USER_UNREGISTERED:
      return {
        ...state,
        register: false,
        failedAuth: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
