import { Dispatch, Action } from 'redux';
import {
  FAVOURITE_RECIPES,
  GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS,
  GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS,
  SORT_MEAL,
  SORT_RECIPES_BY_COMPONENTS__FAILED,
  SORT_RECIPES_BY_COMPONENTS_CONFIRMED,
  SORT_RECIPES_BY_HEALTH_PROBLEMS_CONFIRMED,
  SORT_RECIPES_BY_HEALTH_PROBLEMS_FAILED,
  SORT_RECIPES_BY_MEAL_CONFIRMED_ACTION,
  SORT_RECIPES_BY_MEAL_FAILED_ACTION,
  SORT_RECIPES_BY_RATING_CONFIRMED_ACTION,
  SORT_RECIPES_BY_RATING_FAILED_ACTION,
} from './recipes.constants';
import {
  getDataAboutRecipes,
  getRecipesNotIncludedComponents,
  sortByMealHour,
  sortByRatingAscDesc,
  sortRecipesByMeal,
} from '../../../api/dataAboutRecipes';
import { CategoryHealthElement, MealElement, ProductElement } from '../../types';
import { sortDataByHealth } from '../../../api/dataAboutCategories';

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

export function getFavouriteRecipes(el: ProductElement) {
  return {
    type: FAVOURITE_RECIPES,
    payload: el,
  };
}

function sortDataByHealthProblemsConfirmed(data: Array<CategoryHealthElement>) {
  return {
    type: SORT_RECIPES_BY_HEALTH_PROBLEMS_CONFIRMED,
    payload: data,
  };
}

function sortDataByHealthProblemsFailed(message: any) {
  return {
    type: SORT_RECIPES_BY_HEALTH_PROBLEMS_FAILED,
    payload: message,
  };
}

export function sortedRecipesByHealth(health: string) {
  return (dispatch: Dispatch<Action>) => {
    sortDataByHealth(health)
      .then((res) => {
        if (res.data) {
          dispatch(sortDataByHealthProblemsConfirmed(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(sortDataByHealthProblemsFailed(err));
      });
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

export function sortedRecipesNotIncludeProducts(param1: string, param2?: string, param3?: string, param4?: string, param5?: string, param6?: string) {
  return (dispatch: Dispatch<Action>) => {
    getRecipesNotIncludedComponents(param1, param2, param3)
      .then((res) => {
        if (res.data) {
          dispatch(sortRecipesByComponentsConfirmed(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(sortRecipesByComponentsFailed(err));
      });
  };
}

function sortRecipesByMealConfirmedAction(data: Array<MealElement>) {
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

export function getRecipesSortedByMeal(
  meal: string,
  rating: string,
  param1?: string,
  param2?: string,
  param3?: string,
  param4?: string,
  param5?: string,
  param6?: string
) {
  return (dispatch: Dispatch<Action>) => {
    sortByMealHour(meal, rating, param1, param2, param3, param4, param5, param6)
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

export function sortRecipesByRatingAscDesc(param1: string, param2?: string, param3?: string, param4?: string, param5?: string, param6?: string) {
  return (dispatch: Dispatch<Action>) => {
    sortByRatingAscDesc(param1, param2, param3, param4, param5, param6)
      .then((res) => {
        if (res.data) {
          dispatch(sortRecipesByRatingConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(sortRecipesByRatingFailedAction(err));
      });
  };
}

export function setNameOfMeal(meal: string) {
  return {
    type: SORT_MEAL,
    payload: meal,
  };
}
