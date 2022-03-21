import {
  CREATE_NEW_FOLDER,
  FAVOURITE_RECIPES,
  GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS,
  GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS,
  SAVE_TO_ANOTHER_DIR,
  SORT_MEAL,
  SORT_RECIPES_BY_COMPONENTS__FAILED,
  SORT_RECIPES_BY_COMPONENTS_CONFIRMED,
  SORT_RECIPES_BY_HEALTH_PROBLEMS_CONFIRMED,
  SORT_RECIPES_BY_HEALTH_PROBLEMS_FAILED,
  SORT_RECIPES_BY_MEAL_CONFIRMED_ACTION,
  SORT_RECIPES_BY_MEAL_FAILED_ACTION,
  SORT_RECIPES_BY_RATING_CONFIRMED_ACTION,
  SORT_RECIPES_BY_RATING_FAILED_ACTION,
  UNSAVED_FROM_FAVOURITE_RECIPES,
} from './recipes.constants';
import { Action, CategoryHealthElement, MealElement, ProductElement, RecipesReducer } from '../../types';

const initialState = {
  recipes: [],
  favouriteRecipes: [['basic', []]],
  errorMessage: '',
  successMessage: '',
  meal: '',
};
type Payload = Array<CategoryHealthElement> | Array<ProductElement>;

const recipesReducer = (state = initialState, action: Action = { type: 'DEFAULT' }) => {
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
      if (action.payload !== undefined) {
        state.favouriteRecipes.filter((el: any, i) => {
          if (el[i] === 'basic') {
            const newArr = [...el[i + 1], action.payload];
            el[i + 1] = [...new Set(newArr)];
          }
        });
        return {
          ...state,
          favouriteRecipes: [...state.favouriteRecipes],
        };
      }
      break;
    case UNSAVED_FROM_FAVOURITE_RECIPES:
      console.log(state.favouriteRecipes);
      for (let i = 0; i < state.favouriteRecipes.length; i++) {
        for (let j = 0; j < state.favouriteRecipes.length; j++) {
          for (let t = 0; t < state.favouriteRecipes[i][j + 1].length; t++) {
            console.log(state.favouriteRecipes[i][j + 1]);
            // @ts-ignore
            if (state.favouriteRecipes[i][j + 1][t].id === action.payload.id) {
              console.log(t);
              // @ts-ignore
              state.favouriteRecipes[i][j + 1].splice(t, 1);
            }
          }
        }
      }
      return {
        ...state,
        favouriteRecipes: [...state.favouriteRecipes],
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
      return {
        ...state,
        recipes: action.payload,
      };
    case SORT_RECIPES_BY_MEAL_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SORT_MEAL:
      return {
        ...state,
        meal: action.payload,
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
    case CREATE_NEW_FOLDER:
      return {
        ...state,
        favouriteRecipes: [...state.favouriteRecipes, [action.payload, []]],
      };
    case SAVE_TO_ANOTHER_DIR:
      if (action.payload !== undefined) {
        for (let i = 0; i < state.favouriteRecipes.length; i++) {
          console.log(state.favouriteRecipes[i]);
          for (let j = 0; j < state.favouriteRecipes.length; j++) {
            // @ts-ignore
            if (state.favouriteRecipes[i][j] === action.payload.str) {
              // @ts-ignore
              const newArr = [...state.favouriteRecipes[i][j + 1], action.payload.obj];
              // @ts-ignore
              state.favouriteRecipes[i][j + 1] = [...new Set(newArr)];
            }
          }
        }
      }
      return {
        ...state,
        favouriteRecipes: [...state.favouriteRecipes],
      };
    default:
      return state;
  }
};
export default recipesReducer;
