import { Dispatch, Action } from 'redux';
import {
  CREATE_NEW_FOLDER,
  DELETE_FROM_SHOPPING_LIST,
  FAVOURITE_RECIPES,
  GET_DATA_ABOUT_FAVOURITE_RECIPES_CONFIRMED,
  GET_DATA_ABOUT_FAVOURITE_RECIPES_FAILED,
  GET_DATA_ABOUT_FOLDERS_NAMES_CONFIRMED,
  GET_DATA_ABOUT_FOLDERS_NAMES_FAILED,
  GET_DATA_ABOUT_RECIPES_CONFIRMED_ACTIONS,
  GET_DATA_ABOUT_RECIPES_FAILED_ACTIONS,
  SAVE_TO_ANOTHER_DIR,
  SAVE_TO_SHOPPING_LIST,
  SORT_MEAL,
  SORT_RECIPES_BY_COMPONENTS_CONFIRMED,
  SORT_RECIPES_BY_MEAL_CONFIRMED_ACTION,
  SORT_RECIPES_BY_MEAL_FAILED_ACTION,
  UNSAVED_FROM_FAVOURITE_RECIPES,
} from './recipes.constants';
import { getDataAboutRecipes, sortRecipes } from '../../../api/dataAboutRecipes';
import { RecipeTypes } from '../../types/recipes.types';
import { NewFolder, ObjectForSaveToAnotherDir } from '../../types/types';
import { createFolder, deleteFromFavRecipes, getDataAboutFolderNames, saveRecipeToFolder } from '../../../api/actionsOverFolder';
import { getDataAboutFavRecipes } from '../../../api/dataAboutFavouriteRecipes';

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
  return (dispatch: Dispatch<Action>) => {
    if (el.id !== undefined) {
      saveRecipeToFolder('basic', el.id)
        .then((r) => {
          if (r) {
            dispatch({
              type: FAVOURITE_RECIPES,
              payload: el,
            });
          } else {
            throw Error('something went wrong');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
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

export function setNameOfMeal(meal: string) {
  return {
    type: SORT_MEAL,
    payload: meal,
  };
}

export function createNewFolder(param: NewFolder) {
  return (dispatch: Dispatch<Action>) => {
    createFolder(param.dirName, param.color)
      .then((r) => {
        if (r) {
          return dispatch({
            type: CREATE_NEW_FOLDER,
            payload: param,
          });
        } else {
          throw Error('something went wrong');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function saveToAnotherDir(param1: string, param2: ObjectForSaveToAnotherDir) {
  return (dispatch: Dispatch<Action>) => {
    if (param2.elem.id) {
      saveRecipeToFolder(param1, param2.elem.id)
        .then((r) => {
          if (r) {
            dispatch({
              type: SAVE_TO_ANOTHER_DIR,
              payload: { str: param1, obj: param2 },
            });
          } else {
            throw Error('something went wrong');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

export function unsavedFromFavouriteRecipes(el: RecipeTypes) {
  console.log(el);
  return (dispatch: Dispatch<Action>) => {
    if (el.id) {
      deleteFromFavRecipes(el.id)
        .then((res) => {
          if (res) {
            dispatch({
              type: UNSAVED_FROM_FAVOURITE_RECIPES,
              payload: el,
            });
          } else {
            throw Error();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
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

function getDataAboutFavouriteRecipesConfirmed(arr: Array<RecipeTypes>) {
  return {
    type: GET_DATA_ABOUT_FAVOURITE_RECIPES_CONFIRMED,
    payload: arr,
  };
}

function getDataAboutFavouriteRecipesFailed(err: any) {
  return {
    type: GET_DATA_ABOUT_FAVOURITE_RECIPES_FAILED,
    payload: err,
  };
}

export function getDataAboutFavouriteRecipes(folder: string) {
  return (dispatch: Dispatch<Action>) => {
    getDataAboutFavRecipes(folder)
      .then((res) => {
        if (res.data) {
          return dispatch(getDataAboutFavouriteRecipesConfirmed(res.data));
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        return dispatch(getDataAboutFavouriteRecipesFailed(err));
      });
  };
}

function getDataAboutFoldersConfirmed(arr: any) {
  console.log(arr);
  return {
    type: GET_DATA_ABOUT_FOLDERS_NAMES_CONFIRMED,
    payload: arr,
  };
}

function getDataAboutFoldersFailed(err: any) {
  return {
    type: GET_DATA_ABOUT_FOLDERS_NAMES_FAILED,
    payload: err,
  };
}

export function getDataAboutFolders() {
  return (dispatch: Dispatch<Action>) => {
    getDataAboutFolderNames()
      .then((res) => {
        if (res.data) {
          const folders = [];
          const colors = [];
          for (let i = 0; i < res.data.length; i++) {
            folders.push(res.data[i].folder);
            colors.push(res.data[i].color);
          }
          return dispatch(getDataAboutFoldersConfirmed({ folders: folders, colors: colors }));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(getDataAboutFoldersFailed(err));
      });
  };
}
