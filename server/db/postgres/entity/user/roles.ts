import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
}
export default Roles;