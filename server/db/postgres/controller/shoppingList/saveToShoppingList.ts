import { Request, Response } from 'express';
import ShoppingList from '../../entity/shoppingList/shoppingList';
import { getRepository } from 'typeorm';

const saveToShoppingList = async (req: Request | any, res: Response) => {
  try {
    const shoppingList = await getRepository(ShoppingList).createQueryBuilder('shoppingList');
    await shoppingList.insert().into(ShoppingList).values({ user: req.user.id, position: req.body.position }).execute();
    res.status(200).json({ message: 'add position into shopping list successfully' });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
export default saveToShoppingList;