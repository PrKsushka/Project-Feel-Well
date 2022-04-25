export type Action = {
  type: string;
  payload?: undefined;
};

export interface ProductElement {
  _id: number;
  name: string;
  image: string;
  mealId?: number;
  healthId?: number;
  title?: number;
  ingredients?: Array<string>;
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

export type PayloadForSaveToAnotherDir = {
  str: string;
  obj: object;
};

export type FavRecipesTypes = [[string, Array<ProductElement>]];

export interface RecipesReducer {
  recipes: Array<ProductElement>;
  favouriteRecipes: Array<any>;
  shoppingList: Array<string>;
  errorMessage: string;
  successMessage: string;
  meal: string;
}

export type DataAboutUser = {
  email: string;
  firstName: string;
  lastName: string;
};

export interface UserReducer {
  auth: boolean;
  register: boolean;
  successAuth: string;
  failedAuth: string;
  dataAboutUser: DataAboutUser;
}

export interface ModalReducer {
  loginModal: boolean;
  registrationModal: boolean;
  createDirectoryModal: boolean;
  openPopUp: boolean;
}

export interface StoreState {
  recipes: RecipesReducer;
  user: UserReducer;
  modal: ModalReducer;
}
