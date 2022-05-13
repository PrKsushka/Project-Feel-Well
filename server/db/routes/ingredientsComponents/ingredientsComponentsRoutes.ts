import express from 'express';
import getDataAboutMeal from '../../mongoDB/controller/ingredientsComponents/getDataAboutMeal';
import t from '../../mongoDB/controller/ingredientsComponents/measureAndProducts';

const ingredientsComponentsMD = express.Router();
ingredientsComponentsMD.get('/meal', getDataAboutMeal);
ingredientsComponentsMD.get('/measures', t.getDataAboutMeasures);
ingredientsComponentsMD.get('/products', t.getDataAboutProducts);
export default ingredientsComponentsMD;
