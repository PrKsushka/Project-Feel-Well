import mongoose from 'mongoose';
import ProductTypes from '../../types/productTypes';

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
  },
  healthId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  kcal: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});
productsSchema.index({ name: 'text' });
const Products = mongoose.model<ProductTypes>('Products', productsSchema);
export default Products;
