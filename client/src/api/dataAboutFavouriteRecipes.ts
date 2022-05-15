import { authHost } from './user';

export const getDataAboutFavRecipes=async (folder?: string)=>await authHost.get(`/favouriteRecipes?folder=${folder}`);