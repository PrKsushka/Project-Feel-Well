import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import CitiesTypes from '../../../types/places/cities.types';

@Entity()
class Cities implements CitiesTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;
}

export default Cities;