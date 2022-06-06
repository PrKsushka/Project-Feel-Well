import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ShoppingList from '../../entity/shoppingList/shoppingList';
import CustomError from '../../../customError/customError';

const deleteFromShoppingList = async (req: Request | any, res: Response) => {
  try {
    const shoppingList = await getRepository(ShoppingList).createQueryBuilder('shopping_list');
    let positionId = await shoppingList
      .select('shopping_list.id')
      .where('shopping_list.position=:position', { position: req.body.position })
      .andWhere('shopping_list.userId=:id', { id: req.user.id })
      .getMany();
    const arrOfId = positionId.map((el) => {
      return el.id;
    });
    if (arrOfId.length > 0) {
      await shoppingList.delete().from(ShoppingList).where('shopping_list.id IN (:...arr)', { arr: arrOfId }).execute();
    } else {
      throw Error('something went wrong');
    }
    res.status(200).json('deleted successfully');
  } catch (e) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default deleteFromShoppingList;