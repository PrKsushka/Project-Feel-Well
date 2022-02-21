import mongoose from 'mongoose';

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
  img: {
    type: String,
    required: true,
  },
});
const Places = mongoose.model('Places', placesSchema);
export default Places;
