import mongoose from 'mongoose';
import CategoryTypes from '../../../types/category/categoryTypes';

const categotySchema = new mongoose.Schema({
  health: {
    type: String,
    required: true,
  },
});
const Category = mongoose.model<CategoryTypes>('Category', categotySchema);
export default Category;
