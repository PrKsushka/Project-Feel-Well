import { Dispatch, Action } from 'redux';
import { FAVOURITE_RECIPES, GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS, GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS } from './recipes.constants';
import { getDataAboutRecipes } from '../../../api/dataAboutRecipes';
import { ProductElement } from '../../types';

export function getDataAboutRecipesConfirmedAction(data: Array<object>) {
  return {
    type: GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS,
    payload: data,
  };
}

export default function getDataAboutRecipesFailedAction(message: string) {
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
