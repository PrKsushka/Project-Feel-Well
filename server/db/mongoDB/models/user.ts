import mongoose from 'mongoose';
import User from '../../types/user.types';

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
  favouriteRecipes: {
    type: Array,
    required: true
  }
});

const User = mongoose.model<User>('User', userSchema);
export default User;
