import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './products';
import { Measures } from './measures';
import IngredientsTypes from '../../../types/recipes/ingredients.types';

@Entity()
export class Ingredients implements IngredientsTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Products, (products) => products.id)
  @JoinColumn()
  product: Products;

  @ManyToOne(() => Measures, (measures) => measures.id)
  @JoinColumn()
  measure: Measures;

  @Column()
  count: number;
}