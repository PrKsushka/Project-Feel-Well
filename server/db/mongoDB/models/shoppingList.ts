import mongoose from 'mongoose';
import ShoppingListTypes from '../../types/shoppingList/shoppingList.types';

const shoppingListSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});
const ShoppingList = mongoose.model<ShoppingListTypes>('ShoppingList', shoppingListSchema);
export default ShoppingList;