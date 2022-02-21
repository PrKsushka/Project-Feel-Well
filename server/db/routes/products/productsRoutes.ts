import express from 'express';
import getDataAboutProducts from '../../mongoDB/controller/products/getDataAboutProducts';

const getDataAboutProductsMongoDB = express.Router();
getDataAboutProductsMongoDB.get('/products', getDataAboutProducts);
export default getDataAboutProductsMongoDB;
