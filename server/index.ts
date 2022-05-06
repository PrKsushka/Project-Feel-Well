import express from 'express';
import 'dotenv/config';
import connectionToMongoDataBase from './db/mongoDB/db';
import getDataAboutProductsMongoDB from './db/routes/products/productsRoutes';
import getDataAboutArticlesMongoDB from './db/routes/articles/articlesRoutes';
import getDataAboutMealMongoDB from './db/routes/meal/mealRoutes';
import getDataAboutPlacesMongoDB from './db/routes/places/placesRoutes';
import cors from 'cors';
import userRoute from './db/routes/user/userRoutes';
import getDataAboutCategoriesMongoDB from './db/routes/category/categoryRoutes';
import "reflect-metadata"
import connectionToPostgresDataBase from './db/postgres/db';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if(process.argv[2]==='mongodb'){
  connectionToMongoDataBase();
  app.use(getDataAboutProductsMongoDB);
  app.use(getDataAboutArticlesMongoDB);
  app.use(getDataAboutCategoriesMongoDB);
// app.use(getDataAboutCategoriesPlacesMongoDB);
  app.use(getDataAboutMealMongoDB);
  app.use(getDataAboutPlacesMongoDB);
  app.use(userRoute);
}
else if(process.argv[2]==='postgres'){
  connectionToPostgresDataBase();
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
