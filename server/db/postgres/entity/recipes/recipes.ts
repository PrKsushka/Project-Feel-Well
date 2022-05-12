import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Meals } from './meals';
import { Ingredients } from './ingredients';
import RecipesTypes from '../../../types/recipes/recipes.types';

@Entity()
class Recipes implements RecipesTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Meals, (meals) => meals.id)
  @JoinColumn()
  meal: Meals;

  @Column()
  title: string;

  @Column()
  kcal: number;

  @Column()
  time: number;

  @Column()
  rating: number;

  @Column()
  'createdAt': Date;

  @Column()
  image: string;

  @Column()
  video: string;

  @Column()
  fats: number;

  @Column()
  proteins: number;

  @Column()
  carbohydrate: number;

  @ManyToMany(() => Ingredients)
  @JoinTable()
  ingredients: Ingredients[];
}

export default Recipes;