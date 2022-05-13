import mongoose from 'mongoose';
import MealTypes from '../../../types/recipes/meal.types';

export const mealSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: true,
  },
});
const Meal = mongoose.model<MealTypes>('Meal', mealSchema);
export default Meal;
