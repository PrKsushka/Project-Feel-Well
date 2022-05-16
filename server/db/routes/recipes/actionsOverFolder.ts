import express from 'express';
import auth from '../../../utilsForToken/checkIfAuth';
import saveToFolder from '../../postgres/controller/favouriteRecipes/saveToFolder';
import getDataAboutFolders from '../../postgres/controller/favouriteRecipes/getDataAboutFolders';
import unSavedFromFavouriteRecipes from '../../postgres/controller/favouriteRecipes/unSavedFromFavouriteRecipes';
import getDataAboutFoldersMD from '../../mongoDB/controller/favouriteRecipes/getDataAboutFolders';
import SaveToFolderMD from '../../mongoDB/controller/favouriteRecipes/saveToFolder';
import createNewFolder from '../../postgres/controller/favouriteRecipes/createNewFolder';
import createNewFolderMD from '../../mongoDB/controller/favouriteRecipes/createNewFolder';
import unSavedFromFavouriteRecipesMD from '../../mongoDB/controller/favouriteRecipes/unSavedFromFavouriteRecipes';


const folder=express.Router();
folder.post('/createNewFolder', auth, createNewFolder);
folder.post('/saveRecipeToFolder', auth, saveToFolder);
folder.get('/dataAboutFolders', auth, getDataAboutFolders);
folder.post('/unSavedFromFavouriteRecipes', auth, unSavedFromFavouriteRecipes);

const folderMD=express.Router();
folderMD.get('/dataAboutFolders', auth, getDataAboutFoldersMD);
folderMD.post('/saveRecipeToFolder', auth, SaveToFolderMD);
folderMD.post('/createNewFolder', auth, createNewFolderMD);
folderMD.post('/unSavedFromFavouriteRecipes', auth, unSavedFromFavouriteRecipesMD);
export default { folder, folderMD };