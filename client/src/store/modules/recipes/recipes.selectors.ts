import { StoreState } from '../../types';
import { createSelector } from 'reselect';

const dataAboutRecipes = (state: StoreState) => state.recipes.recipes;
export const getRecipes = createSelector(dataAboutRecipes, (items) => items);
