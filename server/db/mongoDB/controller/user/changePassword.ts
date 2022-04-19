import { Request, Response } from 'express';
import User from '../../models/user';
import bcrypt from 'bcrypt';

const changePassword = async (req: Request | any, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const findUser = await User.findOne({ _id: req.user.id });
    if (!findUser) {
      return res.status(404).json({ message: 'Not found' });
    }
    const comparePass = bcrypt.compareSync(oldPassword, findUser.password);
    if (!comparePass) {
      return res.status(500).json({ message: 'Passwords are different' });
    }
    const hashPassword = await bcrypt.hash(String(newPassword), 5);
    await User.updateOne({_id: req.user.id},{  password: hashPassword });
    res.status(200).json({ message: 'Password has been changed' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default changePassword;