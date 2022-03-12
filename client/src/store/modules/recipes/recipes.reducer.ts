import {
  FAVOURITE_RECIPES,
  GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS,
  GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS,
  SORT_RECIPES_BY_COMPONENTS__FAILED,
  SORT_RECIPES_BY_COMPONENTS_CONFIRMED,
  SORT_RECIPES_BY_HEALTH_PROBLEMS_CONFIRMED,
  SORT_RECIPES_BY_HEALTH_PROBLEMS_FAILED,
  SORT_RECIPES_BY_MEAL_CONFIRMED_ACTION,
  SORT_RECIPES_BY_MEAL_FAILED_ACTION,
  SORT_RECIPES_BY_RATING_CONFIRMED_ACTION,
  SORT_RECIPES_BY_RATING_FAILED_ACTION,
} from './recipes.constants';
import { CategoryHealthElement, MealElement, ProductElement, RecipesReducer } from '../../types';

const initialState = {
  recipes: [],
  favouriteRecipes: [],
  errorMessage: '',
  successMessage: '',
};
type Payload = Array<CategoryHealthElement> | Array<ProductElement>;
type RecipesAction = {
  type: string;
  payload?: undefined;
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
    case FAVOURITE_RECIPES:
      return {
        ...state,
        favouriteRecipes: [...state.favouriteRecipes, action.payload],
      };
    case SORT_RECIPES_BY_HEALTH_PROBLEMS_CONFIRMED:
      if (action.payload !== undefined) {
        const arr: Array<CategoryHealthElement> = [...action.payload];
        const newArr: Array<ProductElement>[] = arr.map((el) => {
          return el.recipes;
        });
        return {
          ...state,
          recipes: newArr[0],
        };
      }
      break;
    case SORT_RECIPES_BY_COMPONENTS_CONFIRMED:
      return {
        ...state,
        recipes: action.payload,
      };
    case SORT_RECIPES_BY_HEALTH_PROBLEMS_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SORT_RECIPES_BY_COMPONENTS__FAILED:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SORT_RECIPES_BY_MEAL_CONFIRMED_ACTION:
      if (action.payload !== undefined) {
        const arr: Array<MealElement> = action.payload;
        const newArr: Array<ProductElement>[] = arr.map((el) => {
          return el.recipes;
        });
        return {
          ...state,
          recipes: newArr[0],
        };
      }
      break;
    case SORT_RECIPES_BY_MEAL_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SORT_RECIPES_BY_RATING_CONFIRMED_ACTION:
      return {
        ...state,
        recipes: action.payload,
      };
    case SORT_RECIPES_BY_RATING_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default recipesReducer;
