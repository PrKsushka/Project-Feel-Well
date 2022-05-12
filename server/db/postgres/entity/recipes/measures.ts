import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Recipes from './recipes';
import { Ingredients } from './ingredients';

@Entity()
export class Measures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  measure: string;
  // @OneToMany(()=>Ingredients, (ingredients)=>ingredients.measure)
  // @JoinColumn()
  // measure: Measures[]
}