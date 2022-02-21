import mongoose from 'mongoose';

const categotySchema = new mongoose.Schema({
  health: {
    type: String,
    required: true,
  },
});
const Category = mongoose.model('Category', categotySchema);
export default Category;
