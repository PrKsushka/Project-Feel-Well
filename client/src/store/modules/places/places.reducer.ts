import {
  DATA_ABOUT_PLACES,
  GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_CONFIRMED,
  GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_FAILED
} from './places.constants';
import { PlacesReducer } from '../../types';

const initialState: PlacesReducer = {
  places: [],
  successSorted: '',
  failedSorted: ''
};
type Action = {
  type: string;
  payload?: any;
};
const placesReducer = (state = initialState, action: Action = { type: 'DEFAULT' }) => {
  switch (action.type) {
    case DATA_ABOUT_PLACES: {
      return {
        ...state,
        places: [...action.payload]
      };
    }
    case GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_CONFIRMED: {
      return {
        ...state,
        places: [...action.payload],
        successSorted: 'Sorted by place successfully',
        failedSorted: ''
      };
    }
    case GET_DATA_ABOUT_PLACES_SORTED_BY_PLACE_FAILED: {
      return {
        ...state,
        failedSorted: action.payload,
        successSorted: ''
      };
    }
    default:
      return state;
  }
};
export default placesReducer;
