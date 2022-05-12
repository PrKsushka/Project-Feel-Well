import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import Users from '../../entity/user/users';
import User from '../../../mongoDB/models/user';

const changePasswordPg = async (req: Request | any, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user=await getRepository(Users).createQueryBuilder("users");
    const findUser=await user
      .where("id =:id", {id: req.query.id})
      .getOne();
    if (!findUser) {
      return res.status(404).json({ message: 'Not found' });
    }
    const comparePass = bcrypt.compareSync(oldPassword, findUser.password);
    if (!comparePass) {
      return res.status(500).json({ message: 'Passwords are different' });
    }
    const hashPassword = await bcrypt.hash(String(newPassword), 5);
    await user.update(Users).set({password: hashPassword}).where("id=:id", {id:req.user.id}).execute()
    res.status(200).json({ message: 'Password has been changed' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default changePasswordPg;