import express from 'express';
import getDataAboutFavouriteRecipes from '../../postgres/controller/favouriteRecipes/getDataAboutFavouriteRecipes';
import auth from '../../../utilsForToken/checkIfAuth';

const favouriteRecipes = express.Router();
favouriteRecipes.get('/favouriteRecipes', auth, getDataAboutFavouriteRecipes);
export default favouriteRecipes;