import express from 'express';
import 'dotenv/config';
import connectionToMongoDataBase from './db/mongoDB/db';
import recipes from './db/routes/recipes/recipesRoutes';
import articles from './db/routes/articles/articlesRoutes';
import ingredientsComponentsMD from './db/routes/ingredientsComponents/ingredientsComponentsRoutes';
import places from './db/routes/places/placesRoutes';
import user from './db/routes/user/userRoutes';
import cors from 'cors';
import 'reflect-metadata';
import connectionToPostgresDataBase from './db/postgres/db';
import favouriteRecipes from './db/routes/recipes/favouriteRecipesRoutes';
import folder from './db/routes/recipes/actionsOverFolder';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.argv[2] === 'mongodb') {
  connectionToMongoDataBase();
  app.use(recipes.getDataAboutProductsMongoDB);
  app.use(articles.getDataAboutArticlesMongoDB);
  app.use(places.getDataAboutPlacesMongoDB);
  app.use(user.userRoute);
  app.use(ingredientsComponentsMD);
} else if (process.argv[2] === 'postgres') {
  connectionToPostgresDataBase();
  app.use(favouriteRecipes);
  app.use(folder);
  app.use(recipes.getDataAboutProductsPostgres);
  app.use(places.getDataAboutPlacesPostgres);
  app.use(user.userRoutePg);
  app.use(articles.getDataAboutArticlesPostgres);
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
