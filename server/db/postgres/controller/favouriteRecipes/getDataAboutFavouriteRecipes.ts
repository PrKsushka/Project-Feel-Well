import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import FavouriteRecipes from '../../entity/favouriRecipes/favouriteRecipes';
import Recipes from '../../entity/recipes/recipes';
import Folders from '../../entity/favouriRecipes/folders';
import Users from '../../entity/user/users';

const getDataAboutFavouriteRecipes = async (req: Request | any, res: Response) => {
  try {
    const favouriteRecipes = await getRepository(FavouriteRecipes).createQueryBuilder('favouriteRecipes');
    let result = await favouriteRecipes

      .leftJoinAndSelect('favouriteRecipes.recipes', 'recipes')
      .leftJoinAndSelect('favouriteRecipes.folder', 'folders')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('users.id')
          .from(Users, 'users')
          .from(Folders, 'folders')
          .where('folders.userId=:id', { id: Number(req.user.id) })
          .getQuery();
        return 'folders.userId IN' + subQuery;
      })
      .getMany();
    if(req.query.folder){
      result=await favouriteRecipes
        .andWhere('folders.folder=:name', {name: String(req.query.folder)})
        .getMany()
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default getDataAboutFavouriteRecipes;