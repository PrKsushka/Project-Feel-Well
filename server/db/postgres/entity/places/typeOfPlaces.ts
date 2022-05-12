import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class TypeOfPlaces {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
export default TypeOfPlaces;