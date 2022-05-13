import express from 'express';
import getDataAboutArticles from '../../mongoDB/controller/articles/getDataAboutArticles';
import getDataAboutArticlesPg from '../../postgres/controller/articles/getDataAboutArticles';

const getDataAboutArticlesMongoDB = express.Router();
getDataAboutArticlesMongoDB.get('/articles', getDataAboutArticles);

const getDataAboutArticlesPostgres=express.Router();
getDataAboutArticlesPostgres.get('/articles', getDataAboutArticlesPg);

export default { getDataAboutArticlesMongoDB, getDataAboutArticlesPostgres };
