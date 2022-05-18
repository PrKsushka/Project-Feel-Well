import { Request, Response } from 'express';
import ShoppingList from '../../models/shoppingList';

const deleteFromShoppingListMD = async (req: Request | any, res: Response) => {
  try {
    const positionId = await ShoppingList.find({
      position: req.body.position,
      user: req.user.id
    });
    await ShoppingList.deleteMany({ _id: { $in: positionId } });
    res.status(200).json({ message: 'deleted successfully' });
  } catch (e) {
    res.status(500).json(e);
  }
};
export default deleteFromShoppingListMD;