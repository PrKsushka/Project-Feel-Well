import { Dispatch, Action } from 'redux';
import {
  CREATE_NEW_FOLDER,
  DELETE_FROM_SHOPPING_LIST,
  FAVOURITE_RECIPES,
  GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS,
  GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS,
  SAVE_TO_ANOTHER_DIR,
  SAVE_TO_SHOPPING_LIST,
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
import { getDataAboutRecipes, sortRecipes } from '../../../api/dataAboutRecipes';
import { sortDataByHealth } from '../../../api/dataAboutCategories';
import { RecipeTypes } from '../../types/recipes.types';
import { NewFolder } from '../../types/types';

function getDataAboutRecipesConfirmedAction(data: Array<object>) {
  return {
    type: GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS,
    payload: data,
  };
}

function getDataAboutRecipesFailedAction(message: string) {
  return {
    type: GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS,
    payload: message,
  };
}

export function dataAboutRecipes() {
  return (dispatch: Dispatch<Action>) => {
    getDataAboutRecipes()
      .then((res) => {
        if (res.data) {
          dispatch(getDataAboutRecipesConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(getDataAboutRecipesFailedAction(err));
      });
  };
}

export function getFavouriteRecipes(el: RecipeTypes) {
  return {
    type: FAVOURITE_RECIPES,
    payload: el,
  };
}

function sortRecipesByComponentsConfirmed(data: Array<object>) {
  return {
    type: SORT_RECIPES_BY_COMPONENTS_CONFIRMED,
    payload: data,
  };
}

function sortRecipesByComponentsFailed(err: any) {
  return {
    type: SORT_RECIPES_BY_COMPONENTS__FAILED,
    payload: err,
  };
}



function sortRecipesByRatingConfirmedAction(data: Array<object>) {
  return {
    type: SORT_RECIPES_BY_RATING_CONFIRMED_ACTION,
    payload: data,
  };
}

function sortRecipesByRatingFailedAction(err: any) {
  return {
    type: SORT_RECIPES_BY_RATING_FAILED_ACTION,
    payload: err,
  };
}


export function setNameOfMeal(meal: string) {
  return {
    type: SORT_MEAL,
    payload: meal,
  };
}

export function createNewFolder(param: NewFolder) {
  return {
    type: CREATE_NEW_FOLDER,
    payload: param,
  };
}

export function saveToAnotherDir(param1: string, param2: object) {
  return {
    type: SAVE_TO_ANOTHER_DIR,
    payload: { str: param1, obj: param2 },
  };
}

export function unsavedFromFavouriteRecipes(el: object) {
  return {
    type: UNSAVED_FROM_FAVOURITE_RECIPES,
    payload: el,
  };
}

export function saveToShoppingList(ingredient: string) {
  return {
    type: SAVE_TO_SHOPPING_LIST,
    payload: ingredient,
  };
}

export function deleteFromShoppingList(ingredient: string) {
  return {
    type: DELETE_FROM_SHOPPING_LIST,
    payload: ingredient,
  };
}





// function sortDataByHealthProblemsConfirmed(data: Array<CategoryHealthElement>) {
//   return {
//     type: SORT_RECIPES_BY_HEALTH_PROBLEMS_CONFIRMED,
//     payload: data,
//   };
// }

// function sortDataByHealthProblemsFailed(message: any) {
//   return {
//     type: SORT_RECIPES_BY_HEALTH_PROBLEMS_FAILED,
//     payload: message,
//   };
// }

// export function sortedRecipesByHealth(health: string) {
//   return (dispatch: Dispatch<Action>) => {
//     sortDataByHealth(health)
//       .then((res) => {
//         if (res.data) {
//           dispatch(sortDataByHealthProblemsConfirmed(res.data));
//         } else {
//           throw Error();
//         }
//       })
//       .catch((err) => {
//         dispatch(sortDataByHealthProblemsFailed(err));
//       });
//   };
// }

// export function sortRecipesByRatingAscDesc(...args: string[]) {
//   return (dispatch: Dispatch<Action>) => {
//     sortByRatingAscDesc(args)
//       .then((res) => {
//         if (res.data) {
//           dispatch(sortRecipesByRatingConfirmedAction(res.data));
//         } else {
//           throw Error();
//         }
//       })
//       .catch((err) => {
//         dispatch(sortRecipesByRatingFailedAction(err));
//       });
//   };
// }
// export function sortedRecipesNotIncludeProducts(...args: string[]) {
//   return (dispatch: Dispatch<Action>) => {
//     getRecipesNotIncludedComponents(args)
//       .then((res) => {
//         if (res.data) {
//           dispatch(sortRecipesByComponentsConfirmed(res.data));
//         } else {
//           throw Error();
//         }
//       })
//       .catch((err) => {
//         dispatch(sortRecipesByComponentsFailed(err));
//       });
//   };
// }
function sortRecipesByMealConfirmedAction(data: Array<RecipeTypes>) {
  return {
    type: SORT_RECIPES_BY_MEAL_CONFIRMED_ACTION,
    payload: data,
  };
}

function sortRecipesByMealFailedAction(message: any) {
  return {
    type: SORT_RECIPES_BY_MEAL_FAILED_ACTION,
    payload: message,
  };
}

export function getRecipesSortedByMeal(...args: string[]) {
  return (dispatch: Dispatch<Action>) => {
    sortRecipes(args)
      .then((res) => {
        if (res.data) {
          dispatch(sortRecipesByMealConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(sortRecipesByMealFailedAction(err));
      });
  };
}