import mongoose from 'mongoose';
import ArticlesTypes from '../../../types/articlesTypes';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  main: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const Article = mongoose.model<ArticlesTypes>('Articles', articleSchema);
export default Article;
