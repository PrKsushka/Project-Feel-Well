import express from 'express';
import getDataAboutMeal from '../../mongoDB/controller/unUsed/meal/getDataAboutMeal';

const getDataAboutMealMongoDB = express.Router();
getDataAboutMealMongoDB.get('/meal', getDataAboutMeal);
export default getDataAboutMealMongoDB;
