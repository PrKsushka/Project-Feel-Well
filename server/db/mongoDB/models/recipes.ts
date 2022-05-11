import mongoose from 'mongoose';
import ProductTypes from '../../types/productTypes';

const recipesSchema = new mongoose.Schema({
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
      count: {
        type: Number,
        required: true
      },
      measure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measures'
      },
      product: {
        product: {
          type: String,
          required: true
        }
      }
      // product: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'Products'
      // }


      // measure: {
      //   type: String,
      //   required: true
      // }
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
recipesSchema.index({ name: 1 });
const Recipes = mongoose.model<ProductTypes>('Recipes', recipesSchema);
export default Recipes;
