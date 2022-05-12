import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Recipes from './recipes';
import MealTypes from '../../../types/recipes/meal.types';

@Entity()
export class Meals implements MealTypes{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meal: string;

  @OneToMany(()=>Recipes, (recipes)=>(recipes.meal))
  recipes: Recipes[]
}
