export interface RecipesReducer {
  recipes: Array<object>;
}

export interface StoreState {
  recipes: RecipesReducer;
}
