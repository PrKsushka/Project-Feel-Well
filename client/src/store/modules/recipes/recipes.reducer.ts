import {
  CREATE_NEW_FOLDER,
  DELETE_FROM_SHOPPING_LIST,
  FAVOURITE_RECIPES,
  GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS,
  GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS,
  SAVE_TO_ANOTHER_DIR,
  SAVE_TO_SHOPPING_LIST,
  SORT_MEAL,
  SORT_RECIPES_BY_HEALTH_PROBLEMS_CONFIRMED,
  SORT_RECIPES_BY_HEALTH_PROBLEMS_FAILED,
  SORT_RECIPES_BY_MEAL_CONFIRMED_ACTION,
  SORT_RECIPES_BY_MEAL_FAILED_ACTION,
  UNSAVED_FROM_FAVOURITE_RECIPES,
} from './recipes.constants';
import { Action, NewFolder, PayloadForSaveToAnotherDir } from '../../types/types';
import { getUniqueListBy } from '../../../utils/getUniqObjectsFromArray';
import { RecipeTypes } from '../../types/recipes.types';

const initialState = {
  recipes: [],
  favouriteRecipes: [['basic', []]],
  folderColor: ['white'],
  shoppingList: [],
  errorMessage: '',
  successMessage: '',
  meal: 'все',
};

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
            el[i + 1] = getUniqueListBy([...el[i + 1], action.payload], '_id');
          }
        });
        return {
          ...state,
          favouriteRecipes: [...state.favouriteRecipes],
        };
      }
      break;
    case UNSAVED_FROM_FAVOURITE_RECIPES: {
      const favRecipes = state.favouriteRecipes as any;
      const payload = action.payload as unknown as RecipeTypes;
      for (let i = 0; i < state.favouriteRecipes.length; i++) {
        for (let j = 0; j < state.favouriteRecipes.length; j++) {
          if (state.favouriteRecipes[i][j + 1] !== undefined) {
            for (let t = 0; t < state.favouriteRecipes[i][j + 1].length; t++) {
              if (favRecipes[i][j + 1][t]._id === payload._id) {
                favRecipes[i][j + 1].splice(t, 1);
              }
            }
          }
        }
      }
      return {
        ...state,
        favouriteRecipes: [...favRecipes],
      };
    }
    // case SORT_RECIPES_BY_HEALTH_PROBLEMS_CONFIRMED:
    //   if (action.payload !== undefined) {
    //     const arr: Array<CategoryHealthElement> = [...action.payload];
    //     const newArr: Array<ProductElement>[] = arr.map((el) => {
    //       return el.recipes;
    //     });
    //     return {
    //       ...state,
    //       recipes: newArr[0],
    //     };
    //   }
    //   break;
    case SORT_RECIPES_BY_HEALTH_PROBLEMS_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
      };
    // case SORT_RECIPES_BY_COMPONENTS_CONFIRMED:
    //   return {
    //     ...state,
    //     recipes: action.payload,
    //   };
    // case SORT_RECIPES_BY_COMPONENTS__FAILED:
    //   return {
    //     ...state,
    //     errorMessage: action.payload,
    //   };
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
    // case SORT_RECIPES_BY_RATING_CONFIRMED_ACTION:
    //   return {
    //     ...state,
    //     recipes: action.payload,
    //   };
    // case SORT_RECIPES_BY_RATING_FAILED_ACTION:
    //   return {
    //     ...state,
    //     errorMessage: action.payload,
    //   };
    case CREATE_NEW_FOLDER: {
      if (action.payload) {
        const payload = action.payload as NewFolder;
        return {
          ...state,
          favouriteRecipes: [...state.favouriteRecipes, [payload.dirName, []]],
          folderColor: [...state.folderColor, payload.color],
        };
      }
      return {
        ...state,
      };
    }
    case SAVE_TO_ANOTHER_DIR: {
      const favRecipes = state.favouriteRecipes as any;
      const payload = action.payload as unknown as PayloadForSaveToAnotherDir;
      for (let i = 0; i < favRecipes.length; i++) {
        for (let j = 0; j < favRecipes.length; j++) {
          if (favRecipes[i][j] === payload.str) {
            // @ts-ignore
            const newArr = [...favRecipes[i][j + 1], payload.obj.elem];
            favRecipes[i][j + 1] = getUniqueListBy(newArr, '_id');
          }
        }
      }
      return {
        ...state,
        favouriteRecipes: [...favRecipes],
      };
    }
    case SAVE_TO_SHOPPING_LIST: {
      const set = new Set([...state.shoppingList, action.payload]);
      return {
        ...state,
        shoppingList: [...set],
      };
    }
    case DELETE_FROM_SHOPPING_LIST: {
      const shoppingList = state.shoppingList as Array<string>;
      shoppingList.forEach((el) => {
        if (el === action.payload) {
          shoppingList.splice(shoppingList.indexOf(el), 1);
        }
      });
      return {
        ...state,
        shoppingList: [...shoppingList],
      };
    }
    default:
      return state;
  }
};
export default recipesReducer;
