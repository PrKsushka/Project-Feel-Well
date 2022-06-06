import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import FavouriteRecipes from '../../entity/favouriRecipes/favouriteRecipes';

const unSavedFromFavouriteRecipes = async (req: Request, res: Response) => {
  try {
    const favRecipes = await getRepository(FavouriteRecipes).createQueryBuilder('favourite_recipes');
    await favRecipes
      .delete()
      .from(FavouriteRecipes)
      .where('"favourite_recipes"."recipesId"=:id', { id: req.body.id })
      .execute();
    res.status(200).json('Successfully delete from fav recipes');
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default unSavedFromFavouriteRecipes;