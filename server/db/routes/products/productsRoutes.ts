import express from 'express';
import getDataAboutProducts from '../../mongoDB/controller/products/getDataAboutProducts';
import auth from '../../../utilsForToken/checkIfAuth';
import getDataAboutRecipes from '../../postgres/controller/recipes/getDataAboutRecipes';

const getDataAboutProductsMongoDB = express.Router();
getDataAboutProductsMongoDB.get('/recipes', getDataAboutProducts);


const getDataAboutProductsPostgres=express.Router();
getDataAboutProductsPostgres.get('/recipes', getDataAboutRecipes);

export default { getDataAboutProductsMongoDB, getDataAboutProductsPostgres };
