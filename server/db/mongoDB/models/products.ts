import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  }
});
const Products = mongoose.model('Products', productsSchema);
export default Products;