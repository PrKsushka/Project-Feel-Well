import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Users from '../user/users';
import ShoppingListTypes from '../../../types/shoppingList/shoppingList.types';

@Entity()
class ShoppingList implements ShoppingListTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @ManyToOne(() => Users, (users) => users.id)
  user: Users;
}

export default ShoppingList;