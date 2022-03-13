export interface ProductElement {
  id: number;
  name: string;
  image: string;
  mealId?: number;
  healthId?: number;
  title?: number;
  ingredients?: string;
  kcal?: number;
  time: number;
  rating: number;
  createdAt?: Date;
}

export interface CategoryHealthElement {
  id: number;
  health: string;
  recipes: Array<ProductElement>;
}

export interface MealElement {
  id: number;
  meal: string;
  image: string;
  recipes: Array<ProductElement>;
}

export interface RecipesReducer {
  recipes: Array<ProductElement>;
  favouriteRecipes: Array<ProductElement>;
  errorMessage: string;
  successMessage: string;
}

export interface StoreState {
  recipes: RecipesReducer;
}
