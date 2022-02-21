import express from 'express';
import 'dotenv/config';
import connectionToMongoDataBase from './db/mongoDB/db';
import getDataAboutProductsMongoDB from './db/routes/products/productsRoutes';

const app = express();
connectionToMongoDataBase();
app.use(getDataAboutProductsMongoDB);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
