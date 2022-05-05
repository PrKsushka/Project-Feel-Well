import { Request, Response } from 'express';
import User from '../../models/user';

const changeDataAboutUser = async (req: Request | any, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    await User.findOneAndUpdate({_id: req.user.id}, {firstName, lastName});
    res.status(200).json({message: 'Data has been changes successfully'})
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default changeDataAboutUser;