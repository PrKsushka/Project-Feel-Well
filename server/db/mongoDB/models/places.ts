import mongoose from 'mongoose';
import PlacesTypes from '../../types/placesTypes';

const placesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  placesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryPlaces',
  },
});
const Places = mongoose.model<PlacesTypes>('Places', placesSchema);
export default Places;
