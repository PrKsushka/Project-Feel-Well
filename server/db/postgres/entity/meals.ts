import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Recipes from './recipes';

@Entity()
export class Meals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meal: string;

  @OneToMany(()=>Recipes, (recipes)=>(recipes.mealId))
  recipes: Recipes[]
}
