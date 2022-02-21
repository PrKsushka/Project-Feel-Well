import mongoose from 'mongoose';

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
const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
