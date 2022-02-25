import express from 'express';
import getDataAboutProducts from '../../mongoDB/controller/products/getDataAboutProducts';
import getDataAboutPlaces from '../../mongoDB/controller/places/getDataAboutPlaces';

const getDataAboutPlacesMongoDB = express.Router();
getDataAboutPlacesMongoDB.get('/places', getDataAboutPlaces);
export default getDataAboutPlacesMongoDB;
