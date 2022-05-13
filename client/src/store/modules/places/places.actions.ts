import { Action, Dispatch } from 'redux';
import { getDataAboutPlaces, getDataAboutPlacesSortedByPlaceOrCity } from '../../../api/dataAboutPlaces';
import {
  GET_DATA_ABOUT_PLACES_CONFIRMED,
  GET_DATA_ABOUT_PLACES_SORTED_BY_CITY_OR_PLACE_CONFIRMED,
  GET_DATA_ABOUT_PLACES_SORTED_BY_CITY_OR_PLACE_FAILED,
} from './places.constants';
import { PlaceElement } from '../../types/types';

function getDataAboutPlacesConfirmed(arr: Array<PlaceElement>) {
  return {
    type: GET_DATA_ABOUT_PLACES_CONFIRMED,
    payload: arr,
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

function getDataSortedByCityOrPlaceConfirmed(arr: Array<PlaceElement>) {
  return {
    type: GET_DATA_ABOUT_PLACES_SORTED_BY_CITY_OR_PLACE_CONFIRMED,
    payload: arr,
  };
}
function getDataSortedByCityOrPlaceFiled(err: any) {
  return {
    type: GET_DATA_ABOUT_PLACES_SORTED_BY_CITY_OR_PLACE_FAILED,
    payload: err,
  };
}
export function getDataSortedByCityOrPlace(val: string, city?: string) {
  return (dispatch: Dispatch<Action>) => {
    getDataAboutPlacesSortedByPlaceOrCity(val, city)
      .then((res) => {
        if (res.data) {
          dispatch(getDataSortedByCityOrPlaceConfirmed(res.data));
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        dispatch(getDataSortedByCityOrPlaceFiled(err));
      });
  };
}
