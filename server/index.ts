import express from 'express';
import 'dotenv/config';
import connectionToMongoDataBase from './db/mongoDB/db';
import recipes from './db/routes/products/productsRoutes';
import getDataAboutArticlesMongoDB from './db/routes/articles/articlesRoutes';
import getDataAboutMealMongoDB from './db/routes/meal/mealRoutes';
import places from './db/routes/places/placesRoutes';
import cors from 'cors';
import user from './db/routes/user/userRoutes';
import getDataAboutCategoriesMongoDB from './db/routes/category/categoryRoutes';
import "reflect-metadata"
import connectionToPostgresDataBase from './db/postgres/db';
import t from './db/mongoDB/controller/unUsed/measureAndProducts';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if(process.argv[2]==='mongodb'){
  connectionToMongoDataBase();
  app.use(recipes.getDataAboutProductsMongoDB);
  app.use(getDataAboutArticlesMongoDB);
  app.use(getDataAboutCategoriesMongoDB);
// app.use(getDataAboutCategoriesPlacesMongoDB);
  app.use(getDataAboutMealMongoDB);
  app.use(places.getDataAboutPlacesMongoDB);
  app.use(user.userRoute);
  app.get('/measures', t.getDataAboutMeasures);
  app.get('/products', t.getDataAboutProducts);
}
else if(process.argv[2]==='postgres'){
  connectionToPostgresDataBase();
  app.use(recipes.getDataAboutProductsPostgres);
  app.use(places.getDataAboutPlacesPostgres)
  app.use(user.userRoutePg)
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
