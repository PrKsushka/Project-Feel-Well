import mongoose from 'mongoose';
import ProductTypes from '../../types/productTypes';

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  mealId: {
    type: String,
    ref: 'Meal'
  },
  healthId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [{
      ingredient: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      },
      measure: {
        type: String,
        required: true
      }
    }],
    required: true
  },
  kcal: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  carbohydrate: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  proteins: {
    type: Number,
    required: true
  },
  video: {
    type: String,
    required: true
  }
});
productsSchema.index({ name: 1 });
const Products = mongoose.model<ProductTypes>('Products', productsSchema);
export default Products;
