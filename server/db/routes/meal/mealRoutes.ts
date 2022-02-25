import express from 'express';
import getDataAboutMeal from '../../mongoDB/controller/meal/getDataAboutMeal';

const getDataAboutMealMongoDB = express.Router();
getDataAboutMealMongoDB.get('/meal', getDataAboutMeal);
export default getDataAboutMealMongoDB;
