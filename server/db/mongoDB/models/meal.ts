import mongoose from 'mongoose';
import MealTypes from '../../types/mealTypes';

const mealSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const Meal = mongoose.model<MealTypes>('Meal', mealSchema);
export default Meal;
