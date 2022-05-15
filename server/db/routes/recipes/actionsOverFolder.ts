import express from 'express';
import createNewFolder from '../../postgres/controller/favouriteRecipes/createNewFolder';
import auth from '../../../utilsForToken/checkIfAuth';
import saveToFolder from '../../postgres/controller/favouriteRecipes/saveToFolder';
import getDataAboutFolders from '../../postgres/controller/favouriteRecipes/getDataAboutFolders';
import unSavedFromFavouriteRecipes from '../../postgres/controller/favouriteRecipes/unSavedFromFavouriteRecipes';

const folder=express.Router();
folder.post('/createNewFolder', auth, createNewFolder);
folder.post('/saveRecipeToFolder', auth, saveToFolder);
folder.get('/dataAboutFolders', auth, getDataAboutFolders);
folder.post('/unSavedFromFavouriteRecipes', auth, unSavedFromFavouriteRecipes)
export default folder;