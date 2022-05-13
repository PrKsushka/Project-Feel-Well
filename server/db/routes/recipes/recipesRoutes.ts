import express from 'express';
import getDataAboutRecipesPg from '../../postgres/controller/recipes/getDataAboutRecipes';
import getDataAboutRecipes from '../../mongoDB/controller/recipes/getDataAboutRecipes';

const getDataAboutProductsMongoDB = express.Router();
getDataAboutProductsMongoDB.get('/recipes', getDataAboutRecipes);


const getDataAboutProductsPostgres=express.Router();
getDataAboutProductsPostgres.get('/recipes', getDataAboutRecipesPg);

export default { getDataAboutProductsMongoDB, getDataAboutProductsPostgres };
