import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import User from '../../models/user';
import { ObjectId } from 'mongodb';

const unSavedFromFavouriteRecipesMD = async (req: Request | any, res: Response) => {
  try {
    await User.updateOne({ _id: new ObjectId(req.user.id) }, {
      $pull: {
        favouriteRecipes: {
          'recipes._id': new ObjectId(req.body.id)
        }
      }
    });
    res.status(200).json('deleted successfully');
  } catch (e) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default unSavedFromFavouriteRecipesMD;