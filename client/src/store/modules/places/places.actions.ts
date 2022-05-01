import { Action, Dispatch } from 'redux';
import { getDataAboutPlaces, getDataAboutPlacesSortedByPlace } from '../../../api/dataAboutPlaces';
import {
  GET_DATA_ABOUT_PLACES_CONFIRMED,
  GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_CONFIRMED,
  GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_FAILED
} from './places.constants';
import { PlaceElement } from '../../types';

function getDataAboutPlacesConfirmed(arr: Array<PlaceElement>) {
  return {
    type: GET_DATA_ABOUT_PLACES_CONFIRMED,
    payload: arr
  };
}

export function dataAboutPlaces() {
  return (dispatch: Dispatch<Action>) => {
    getDataAboutPlaces()
      .then((res) => {
        if (res.data) {
          dispatch(getDataAboutPlacesConfirmed(res.data));
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
}

function getDataAboutPlacesSortedByPlaceConfirmed(data: Array<PlaceElement>) {
  return {
    type: GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_CONFIRMED,
    payload: data
  };
}

function getDataAboutPlacesSortedByPlaceFailed(err: any) {
  return {
    type: GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_FAILED,
    payload: err
  };
}

export function dataAboutPlacesSortedByPlace(val: string) {
  return (dispatch: Dispatch<Action>) => {
    getDataAboutPlacesSortedByPlace(val)
      .then((res) => {
        if (res.data) {
          dispatch(getDataAboutPlacesSortedByPlaceConfirmed(res.data));
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        dispatch(getDataAboutPlacesSortedByPlaceFailed(err));
      });
  };
}
