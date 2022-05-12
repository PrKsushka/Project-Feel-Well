import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import MeasuresTypes from '../../../types/recipes/measures.types';

@Entity()
export class Measures implements MeasuresTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  measure: string;
  // @OneToMany(()=>Ingredients, (ingredients)=>ingredients.measure)
  // @JoinColumn()
  // measure: Measures[]
}