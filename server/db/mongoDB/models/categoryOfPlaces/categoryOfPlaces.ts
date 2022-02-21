import mongoose from 'mongoose';
import CategoryOfPlacesTypes from '../../../types/categoryOfPlaces/categoryOfPlacesTypes';

const categoryOfPlacesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const CategoryOfPlaces = mongoose.model<CategoryOfPlacesTypes>('CategoryPlaces', categoryOfPlacesSchema);
export default CategoryOfPlaces;
