import { StoreState } from '../../types';
import { createSelector } from 'reselect';

const dataAboutRecipes = (state: StoreState) => state.recipes.recipes;
export const getRecipes = createSelector(dataAboutRecipes, (items) => items);

const shoppingList = (state: StoreState) => state.recipes.shoppingList;
export const getShoppingList = createSelector(shoppingList, (items) => items);
