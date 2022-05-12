import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import ProductsTypes from '../../../types/recipes/products.types';

@Entity()
export class Products implements ProductsTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;
}