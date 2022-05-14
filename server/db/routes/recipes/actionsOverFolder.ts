import express from 'express';
import createNewFolder from '../../postgres/controller/favouriteRecipes/createNewFolder';
import auth from '../../../utilsForToken/checkIfAuth';
import saveToFolder from '../../postgres/controller/favouriteRecipes/saveToFolder';

const folder=express.Router();
folder.post('/createNewFolder', auth, createNewFolder);
folder.post('/saveRecipeToFolder', auth, saveToFolder);

export default folder;