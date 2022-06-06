import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Folders from '../../entity/favouriRecipes/folders';
import FavouriteRecipes from '../../entity/favouriRecipes/favouriteRecipes';

const saveToFolder = async (req: Request | any, res: Response) => {
  try {
    const favRecipe = await getRepository(FavouriteRecipes).createQueryBuilder('favourite_recipes');
    let folderId = await favRecipe
      .subQuery()
      .select('folders.id')
      .from(Folders, 'folders')
      .where('folders.folder=:name', { name: String(req.body.folderName) })
      .andWhere('folders.userId=:id', { id: Number(req.user.id) })
      .getOne();

    if (folderId.id !== null) {
      await favRecipe
        .insert()
        .into(FavouriteRecipes)
        .values({
          user: () => String(req.user.id),
          recipes: () => String(req.body.recipeId),
          folder: () => String(folderId.id)
        })
        .execute();
    } else {
      throw Error('there are no such directory');
    }
    res.status(200).json('saved successfully');
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default saveToFolder;