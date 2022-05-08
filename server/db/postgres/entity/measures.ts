import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Recipes from './recipes';
import { Ingredients } from './ingredients';

@Entity()
export class Measures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  measure: string;
}