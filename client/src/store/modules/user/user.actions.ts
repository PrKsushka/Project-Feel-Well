import {
  GET_DATA_ABOUT_USER_FAILED,
  GET_DATA_ABOUT_USER_SUCCESS,
  USER_AUTHENTICATED,
  USER_REGISTERED,
  USER_UNAUTHENTICATED,
  USER_UNREGISTERED,
} from './user.constants';
import { Action, Dispatch } from 'redux';
import { dataAboutUser } from '../../../api/user/getDataAboutUser';

export function userAuthenticated() {
  return {
    type: USER_AUTHENTICATED,
  };
}

export function userUnauthenticated(param?: string) {
  return {
    type: USER_UNAUTHENTICATED,
    payload: param,
  };
}

export function userRegistered(firstName: string, lastName: string) {
  return {
    type: USER_REGISTERED,
    payload: { firstName: firstName, lastName: lastName },
  };
}

export function userUnregistered(param?: string) {
  return {
    type: USER_UNREGISTERED,
    payload: param,
  };
}

type UserData = {
  email: string;
  firstName: string;
  lastName: string;
};

function getDataAboutUserSuccess(data: UserData) {
  return {
    type: GET_DATA_ABOUT_USER_SUCCESS,
    payload: data,
  };
}

function getDataAboutUserFailed(data: any) {
  return {
    type: GET_DATA_ABOUT_USER_FAILED,
    payload: data,
  };
}

export function getDataAboutUser() {
  return (dispatch: Dispatch<Action>) => {
    dataAboutUser()
      .then((res) => {
        if (res.data) {
          dispatch(getDataAboutUserSuccess(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(getDataAboutUserFailed(err));
      });
  };
}
