import express from 'express';
import getDataAboutCategories from '../../mongoDB/controller/category/getDataAboutCategories';

const getDataAboutCategoriesMongoDB = express.Router();
getDataAboutCategoriesMongoDB.get('/category', getDataAboutCategories);
export default getDataAboutCategoriesMongoDB;
