import { Request, Response } from 'express';
import User from '../../models/user';
import CustomError from '../../../customError/customError';
import bcrypt from 'bcrypt';
import TokenService from '../../../../utilsForToken/tokenService';

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw CustomError.unauthorizedRequest('Пользователя с таким email не существует');
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw CustomError.unauthorizedRequest('Неверный пароль');
    }
    const token = TokenService.generateToken(user.id, user.email, user.role);
    const refreshToken = TokenService.refreshToken(user.id, user.email, user.role);
    return res.status(200).json({ token, refreshToken });
  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default authenticate;
