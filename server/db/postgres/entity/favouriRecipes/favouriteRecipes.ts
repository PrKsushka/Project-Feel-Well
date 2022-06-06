import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Users from '../user/users';
import Recipes from '../recipes/recipes';
import Folders from './folders';
import FavouriteRecipesTypes from '../../../types/favouriteRecipes/favouriteRecipes.types';

@Entity()
class FavouriteRecipes implements FavouriteRecipesTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (users) => users.id)
  @JoinColumn()
  user: Users;

  @ManyToOne(() => Recipes, (recipes) => recipes.id)
  @JoinColumn()
  recipes: Recipes;

  @ManyToOne(() => Folders, (folders) => folders.id)
  @JoinColumn()
  folder?: Folders;
}

export default FavouriteRecipes;