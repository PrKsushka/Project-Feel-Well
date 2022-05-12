import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import TypeOfPlacesTypes from '../../../types/places/typeOfPlaces.types';

@Entity()
class TypeOfPlaces implements TypeOfPlacesTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}

export default TypeOfPlaces;