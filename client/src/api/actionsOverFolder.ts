import { authHost } from './user';

export const saveRecipeToFolder = async (folderName = 'basic', recipeId: number | undefined) =>
  await authHost.post('/saveRecipeToFolder', { folderName, recipeId });

export const createFolder = async (folder: string, color: string) => await authHost.post('/createNewFolder', { folder, color });

export const getDataAboutFolderNames = async () => await authHost.get('/dataAboutFolders');

export const deleteFromFavRecipes = async (id: number | undefined) => await authHost.post('/unSavedFromFavouriteRecipes', { id });
