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

export interface RecipesReducer {
  recipes: Array<ProductElement>;
}

export interface StoreState {
  recipes: RecipesReducer;
}
