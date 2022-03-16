import express from 'express';
import getDataAboutProducts from '../../mongoDB/controller/products/getDataAboutProducts';
import auth from '../../../utilsForToken/checkIfAuth';

const getDataAboutProductsMongoDB = express.Router();
getDataAboutProductsMongoDB.get('/recipes', getDataAboutProducts);
export default getDataAboutProductsMongoDB;
