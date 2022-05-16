import mongoose from 'mongoose';
import FoldersTypes from '../../../types/favouriteRecipes/folders.types';

const foldersSchema = new mongoose.Schema({
  folder: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  color: {
    type: String,
    required: true
  }
});
const Folders = mongoose.model<FoldersTypes>('Folders', foldersSchema);
export default Folders;