import mongoose from 'mongoose';
import ProductsTypes from '../../../types/recipes/products.types';

const productsSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  }
});
const Products = mongoose.model<ProductsTypes>('Products', productsSchema);
export default Products;