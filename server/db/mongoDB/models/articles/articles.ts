import mongoose from 'mongoose';

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
const Article = mongoose.model('Articles', articleSchema);
export default Article;
