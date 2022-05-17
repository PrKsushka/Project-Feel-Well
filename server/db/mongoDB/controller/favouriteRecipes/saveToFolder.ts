import { Request, Response } from 'express';
import Folders from '../../models/folders';
import FoldersTypes from '../../../types/favouriteRecipes/folders.types';
import { ObjectId } from 'mongodb';
import User from '../../models/user';
import Recipes from '../../models/recipes/recipes';
import CustomError from '../../../customError/customError';

const SaveToFolderMD = async (req: Request | any, res: Response) => {
  try {
    const folder = await Folders.findOne({
      folder: req.body.folderName,
      user: new ObjectId(req.user.id)
    }).lean<FoldersTypes>();
    const recipe = await Recipes.findOne({ _id: new ObjectId(req.body.recipeId) });
    await User.updateOne({ _id: new ObjectId(req.user.id) }, {
      $push: {
        favouriteRecipes: {
          recipes: recipe,
          folder: folder._id
        }
      }
    });
    res.status(200).json(recipe);
  } catch (e) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default SaveToFolderMD;