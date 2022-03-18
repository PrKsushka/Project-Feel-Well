export type Action = {
  type: string;
  payload?: undefined;
};
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
  meal: string;
}
export interface UserReducer {
  auth: boolean;
  register: boolean;
  successAuth: string;
  failedAuth: string;
}
export interface ModalReducer {
  loginModal: boolean;
  registrationModal: boolean;
}
export interface StoreState {
  recipes: RecipesReducer;
  user: UserReducer;
  modal: ModalReducer;
}
