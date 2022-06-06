import mongoose from 'mongoose';
import User from '../../types/user.types';
import folder from '../../routes/recipes/actionsOverFolder';
import Recipes, { recipesSchema } from './recipes/recipes';
import { Schema } from 'inspector';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  favouriteRecipes: [
    {
      folder: {
        type: mongoose.Types.ObjectId,
        ref: 'Folders'
      },
      recipes: recipesSchema
    }
  ]
});

const User = mongoose.model<User>('User', userSchema);
export default User;
