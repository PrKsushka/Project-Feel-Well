import { GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS, GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS } from './recipes.constants';
import { RecipesReducer } from '../../types';

const initialState = {
  recipes: [],
  errorMessage: '',
  successMessage: '',
};
type RecipesAction = {
  type: string;
  payload?: Array<RecipesReducer> | number;
};
const recipesReducer = (state = initialState, action: RecipesAction = { type: 'DEFAULT' }) => {
  switch (action.type) {
    case GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS:
      return {
        ...state,
        recipes: action.payload,
        successMessage: 'Ok',
      };
    case GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default recipesReducer;
