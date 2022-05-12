import mongoose from 'mongoose';

const categoryOfPlacesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const CategoryOfPlaces = mongoose.model('CategoryPlaces', categoryOfPlacesSchema);
export default CategoryOfPlaces;
