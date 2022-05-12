import express from 'express';
import getDataAboutPlaces from '../../mongoDB/controller/places/getDataAboutPlaces';
import getDataAboutPlacesPg from '../../postgres/controller/places/getDataAboutPlaces';

const getDataAboutPlacesMongoDB = express.Router();
getDataAboutPlacesMongoDB.get('/places', getDataAboutPlaces);

const getDataAboutPlacesPostgres=express.Router();
getDataAboutPlacesPostgres.get('/places', getDataAboutPlacesPg)
export default { getDataAboutPlacesMongoDB, getDataAboutPlacesPostgres };
