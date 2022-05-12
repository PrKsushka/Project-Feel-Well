import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Cities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;
}
export default Cities;