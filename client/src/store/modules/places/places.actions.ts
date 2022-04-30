import { Action, Dispatch } from 'redux';
import { getDataAboutPlaces, getDataAboutPlacesSortedByPlace } from '../../../api/dataAboutPlaces';
import { DATA_ABOUT_PLACES, GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_CONFIRMED, GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_FAILED } from './places.constants';

export function dataAboutPlaces() {
  return () => {
    getDataAboutPlaces()
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          return {
            type: DATA_ABOUT_PLACES,
            payload: res.data,
          };
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
}

function getDataAboutPlacesSortedByPlaceConfirmed(data: Array<object>) {
  return {
    type: GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_CONFIRMED,
    payload: data,
  };
}

function getDataAboutPlacesSortedByPlaceFailed(err: any) {
  return {
    type: GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_FAILED,
    payload: err,
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
