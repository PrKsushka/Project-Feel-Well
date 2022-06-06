import { RecipeTypes } from './recipes.types';

export type Action = {
  type: string;
  payload?: undefined;
};

export type PlaceElement = {
  _id?: number;
  id?: number;
  address?: string;
  city?: string;
  image?: string;
  name: string;
  title: string;
  content?: string;
  typeOfPlaces?: string;
  workingHours?: string;
};

// export interface CategoryHealthElement {
//   id: number;
//   health: string;
//   recipes: Array<ProductElement>;
// }

// export interface MealElement {
//   id: number;
//   meal: string;
//   image: string;
//   recipes: Array<ProductElement>;
// }

export type ObjectForSaveToAnotherDir = {
  currentTime?: any;
  elem: RecipeTypes;
};
export type PayloadForSaveToAnotherDir = {
  str: string;
  obj: ObjectForSaveToAnotherDir;
};
export type ObjectForGatDataAboutFolders = {
  folders: Array<string>;
  colors: Array<string>;
};
export type ObjectOfFavouriteRecipe = {
  id?: number;
  folder?: {
    id?: number;
    folder?: string;
    color?: string;
  };
  recipes: RecipeTypes;
};

// export type FavRecipesTypes = [[string, Array<ProductElement>]];

export interface RecipesReducer {
  recipes: Array<RecipeTypes>;
  favouriteRecipes: Array<any>;
  favouriteRecipesWithDB: Array<RecipeTypes>;
  folders: Array<string>;
  shoppingList: Array<string>;
  errorMessage: string;
  successMessage: string;
  meal: string;
  folderColor: Array<string>;
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
  lightOrDarkTheme: boolean;
}

export interface ModalReducer {
  loginModal: boolean;
  registrationModal: boolean;
  createDirectoryModal: boolean;
  openPopUp: boolean;
  placesDetails: boolean;
  changeDataAboutUserModal: boolean;
  changePasswordModal: boolean;
}

export interface PlacesReducer {
  arrOfPlaces: Array<PlaceElement>;
  successSorted: string;
  failedSorted: string;
}
export interface StoreState {
  recipes: RecipesReducer;
  user: UserReducer;
  modal: ModalReducer;
  places: PlacesReducer;
}

export type NewFolder = {
  dirName: string;
  color: string;
};
