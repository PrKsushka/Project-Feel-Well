import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ShoppingList from '../../entity/shoppingList/shoppingList';
import CustomError from '../../../customError/customError';

const getDataAboutShoppingList = async (req: Request | any, res: Response) => {
  try {
    const shoppingList = await getRepository(ShoppingList).createQueryBuilder('shopping_list');
    const result = await shoppingList
      .where('shopping_list.userId=:id', { id: req.user.id })
      .distinct(true)
      .getMany();
    const shoppingListArr = result.map((el) => {
      return el.position;
    });
    res.status(200).json([...Array.from(new Set(shoppingListArr))]);
  } catch (e) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default getDataAboutShoppingList;