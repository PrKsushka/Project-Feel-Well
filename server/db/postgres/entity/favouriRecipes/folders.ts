import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Users from '../user/users';
import FoldersTypes from '../../../types/favouriteRecipes/folders.types';

@Entity()
class Folders implements FoldersTypes{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  folder: string;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn()
  user: Users;
}
export default Folders;