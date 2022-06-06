import express from 'express';
import getDataAboutFavouriteRecipes from '../../postgres/controller/favouriteRecipes/getDataAboutFavouriteRecipes';
import auth from '../../../utilsForToken/checkIfAuth';
import getDataAboutFavouriteRecipesMD from '../../mongoDB/controller/favouriteRecipes/getDataAboutFavouriteRecipes';

const favouriteRecipes = express.Router();
favouriteRecipes.get('/favouriteRecipes', auth, getDataAboutFavouriteRecipes);

const favouriteRecipesMD=express.Router();
favouriteRecipesMD.get('/favouriteRecipes', auth, getDataAboutFavouriteRecipesMD);

export default { favouriteRecipes, favouriteRecipesMD };