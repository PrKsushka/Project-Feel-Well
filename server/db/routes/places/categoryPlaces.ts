import express from 'express';
import sortDataCategoryPlaces from '../../mongoDB/controller/places/sortDataCategoryPlaces';

const getDataAboutCategoriesPlacesMongoDB = express.Router();
getDataAboutCategoriesPlacesMongoDB.get('/categoryPlaces', sortDataCategoryPlaces);
export default getDataAboutCategoriesPlacesMongoDB;
