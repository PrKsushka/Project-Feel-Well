import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import ShoppingList from '../../models/shoppingList';
import { ObjectId } from 'mongodb';
import ShoppingListTypes from '../../../types/shoppingList/shoppingList.types';

const getDataAboutShoppingListMD = async (req: Request | any, res: Response) => {
  try {
    const shoppingList = await ShoppingList.find({ user: new ObjectId(String(req.user.id)) });
    const shoppingListArr = shoppingList as unknown as Array<ShoppingListTypes>;
    const resultArr = shoppingListArr.map((el: ShoppingListTypes) => {
      return el.position;
    });
    res.status(200).json([...Array.from(new Set(resultArr))]);
  } catch (e) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default getDataAboutShoppingListMD;