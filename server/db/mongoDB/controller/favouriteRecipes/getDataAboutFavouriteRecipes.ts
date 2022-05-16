import { Request, Response } from 'express';
import User from '../../models/user';
import Folders from '../../models/unUsed/folders';
import { ObjectId } from 'mongodb';
import FoldersTypes from '../../../types/favouriteRecipes/folders.types';

const getDataAboutFavouriteRecipesMD=async (req: Request |any, res: Response)=>{
  try{
    let result, folder;
    result=await User.findOne({_id: new ObjectId(req.user.id)})
    if(req.query.folder){
       folder=await Folders.findOne({folder: req.query.folder, user: new ObjectId(req.user.id)}).lean<FoldersTypes>();
       result=await User.aggregate([
        {
          $match: {
            'favouriteRecipes.folder': new ObjectId(String(folder._id))
          }
        },
        {
          $project: {
            favouriteRecipes: {
              $filter: {
                input: '$favouriteRecipes',
                as: 'favouriteRecipes',
                cond: { $eq: ['$$favouriteRecipes.folder', new ObjectId(String(folder._id))] },
              },
            }
          }
        }
      ])
    }
    res.status(200).json(result)
  }catch (e){
    res.status(500).json(e)
  }
}
export default getDataAboutFavouriteRecipesMD;