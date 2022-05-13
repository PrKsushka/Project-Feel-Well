import mongoose from 'mongoose';

const measuresSchema = new mongoose.Schema({
  measure: {
    type: String,
    required: true
  }
});
const Measures = mongoose.model('Measures', measuresSchema);
export default Measures;