import { Request, Response } from 'express';
import ShoppingList from '../../models/shoppingList';
import CustomError from '../../../customError/customError';

const saveToShoppingListMD=async (req: Request | any, res:Response)=>{
  try{
    await ShoppingList.create({position: req.body.position, user: req.user.id});
    res.status(200).json({message: 'add successfully to shopping list'})
  }catch (e){
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
}
export default saveToShoppingListMD;