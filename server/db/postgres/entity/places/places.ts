import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Cities from './cities';
import TypeOfPlaces from './typeOfPlaces';
import PlacesTypes from '../../../types/places/places.types';

@Entity()
class Places implements PlacesTypes{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @ManyToOne(() => Cities, (cities) => cities.id)
  @JoinColumn()
  city: Cities;

  @Column()
  address: string;

  @ManyToOne(() => TypeOfPlaces, (typeOfPlaces) => typeOfPlaces.id)
  @JoinColumn()
  typeOfPlaces: TypeOfPlaces;

  @Column()
  workingHours: string;

  @Column()
  image: string;

  @Column()
  content: string;
}
export default Places;