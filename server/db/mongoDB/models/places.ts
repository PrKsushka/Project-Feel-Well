import mongoose from 'mongoose';
import PlacesTypes from '../../types/places.types';

const placesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  typeOfPlaces: {
    type: String,
    required: true
  },
  workingHours: {
    type: String,
    required: true
  },
});
placesSchema.index({ typeOfPlaces: 1 });
placesSchema.index({ city: 1 });
const Places = mongoose.model<PlacesTypes>('Places', placesSchema);
export default Places;
