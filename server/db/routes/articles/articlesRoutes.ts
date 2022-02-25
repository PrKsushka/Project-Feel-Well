import express from 'express';
import getDataAboutArticles from '../../mongoDB/controller/articles/getDataAboutArticles';

const getDataAboutArticlesMongoDB = express.Router();
getDataAboutArticlesMongoDB.get('/articles', getDataAboutArticles);
export default getDataAboutArticlesMongoDB;
