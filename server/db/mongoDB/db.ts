import 'dotenv/config';
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongodb';

const MONGO_URI = `mongodb+srv://User:${process.env.DB_PASS}@health.fzphq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

interface ConnectionOptionsExtend extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectionToMongoDataBase = async () => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log('MongoDB connection success');
  } catch (err) {
    console.log('Mongodb connection failed');
    process.exit(1);
  }
};
export default connectionToMongoDataBase;
