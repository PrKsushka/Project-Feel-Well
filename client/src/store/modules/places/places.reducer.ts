import {
  GET_DATA_ABOUT_PLACES_CONFIRMED,
  GET_DATA_ABOUT_PLACES_SORTED_BY_CITY_OR_PLACE_CONFIRMED,
  GET_DATA_ABOUT_PLACES_SORTED_BY_CITY_OR_PLACE_FAILED,
} from './places.constants';
import { PlacesReducer } from '../../types';

const initialState: PlacesReducer = {
  arrOfPlaces: [],
  successSorted: '',
  failedSorted: '',
};
type Action = {
  type: string;
  payload?: any;
};
const placesReducer = (state = initialState, action: Action = { type: 'DEFAULT' }) => {
  switch (action.type) {
    case GET_DATA_ABOUT_PLACES_CONFIRMED: {
      return {
        ...state,
        arrOfPlaces: [...action.payload],
      };
    }
    case GET_DATA_ABOUT_PLACES_SORTED_BY_CITY_OR_PLACE_CONFIRMED: {
      return {
        ...state,
        arrOfPlaces: [...action.payload],
        successSorted: 'Data sorted successfully',
        failedSorted: '',
      };
    }
    case GET_DATA_ABOUT_PLACES_SORTED_BY_CITY_OR_PLACE_FAILED: {
      return {
        ...state,
        failedSorted: action.payload,
        successSorted: '',
      };
    }
    default:
      return state;
  }
};
export default placesReducer;
