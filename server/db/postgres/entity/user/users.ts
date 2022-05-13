import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Roles from './roles';
import User from '../../../types/user.types';

@Entity()
class Users implements User{
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @ManyToOne(() => Roles, (roles) => roles.id)
  @JoinColumn()
  role?: Roles;
}

export default Users;