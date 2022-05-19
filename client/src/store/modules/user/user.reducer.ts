import { Action, DataAboutUser, UserReducer } from '../../types/types';
import { GET_DATA_ABOUT_USER_SUCCESS, LOG_OUT, USER_AUTHENTICATED, USER_REGISTERED, USER_UNAUTHENTICATED, USER_UNREGISTERED } from './user.constants';
import storage from 'redux-persist/lib/storage';

const initialState: UserReducer = {
  auth: false,
  register: false,
  successAuth: '',
  failedAuth: '',
  dataAboutUser: {
    email: '',
    firstName: '',
    lastName: '',
  },
};
type UserAction = {
  type: string;
  payload?: DataAboutUser;
};
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
    case GET_DATA_ABOUT_USER_SUCCESS: {
      return {
        ...state,
        dataAboutUser: {
          email: action.payload?.email,
          firstName: action.payload?.firstName,
          lastName: action.payload?.lastName,
        },
      };
    }
    case LOG_OUT: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
export default userReducer;
