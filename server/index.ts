import express from 'express';
import 'dotenv/config';
import connectionToMongoDataBase from './db/mongoDB/db';

const app = express();
connectionToMongoDataBase();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
