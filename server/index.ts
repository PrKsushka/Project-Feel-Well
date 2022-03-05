import express from 'express';
import 'dotenv/config';
import connectionToMongoDataBase from './db/mongoDB/db';
import getDataAboutProductsMongoDB from './db/routes/products/productsRoutes';
import getDataAboutArticlesMongoDB from './db/routes/articles/articlesRoutes';
import getDataAboutCategoriesMongoDB from './db/routes/category/categoryRoutes';
import getDataAboutMealMongoDB from './db/routes/meal/mealRoutes';
import getDataAboutPlacesMongoDB from './db/routes/places/placesRoutes';
import cors from 'cors';

const app = express();

connectionToMongoDataBase();
app.use(cors());
app.use(getDataAboutProductsMongoDB);
app.use(getDataAboutArticlesMongoDB);
app.use(getDataAboutCategoriesMongoDB);
app.use(getDataAboutMealMongoDB);
app.use(getDataAboutPlacesMongoDB);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
