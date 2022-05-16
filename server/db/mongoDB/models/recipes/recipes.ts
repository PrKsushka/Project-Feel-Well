import mongoose from 'mongoose';
import Recipes from '../../../types/recipes/recipes.types';
import RecipesTypes from '../../../types/recipes/recipes.types';

export const recipesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
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
const Recipes = mongoose.model<RecipesTypes>('Recipes', recipesSchema);
export default Recipes;
