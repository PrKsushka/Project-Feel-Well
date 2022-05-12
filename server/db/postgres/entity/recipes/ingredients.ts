import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './products';
import { Measures } from './measures';

@Entity()
export class Ingredients {
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