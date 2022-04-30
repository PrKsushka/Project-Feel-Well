export type Action = {
  type: string;
  payload?: undefined;
};
type Ingredients = {
  ingredient: string;
  count: number;
  measure: string;
};

export interface ProductElement {
  _id: number;
  name: string;
  image: string;
  mealId?: number;
  healthId?: number;
  title?: number;
  ingredients?: Array<Ingredients>;
  kcal?: number;
  time: number;
  rating: number;
  createdAt?: Date;
  carbohydrate?: number;
  fats?: number;
  proteins?: number;
  video?: string;
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

export interface PlacesReducer {
  places: Array<object>;
  successSorted: string;
  failedSorted: string;
}
export interface StoreState {
  recipes: RecipesReducer;
  user: UserReducer;
  modal: ModalReducer;
  places: PlacesReducer;
}
