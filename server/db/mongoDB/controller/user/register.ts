import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import TokenService from '../../../../utilsForToken/tokenService';

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;
    if (!email || !password) {
      throw CustomError.unauthorizedRequest('Некооректно введен пароль или email');
    }
    const person = await User.findOne({ email: email });
    if (person) {
      throw CustomError.unauthorizedRequest('Пользователь с таким email уже существует');
    }
    const hashPassword = await bcrypt.hash(String(password), 5);
    const user = await User.create({ email: email, password: hashPassword, firstName: firstName, lastName: lastName });
    const token = TokenService.generateToken(user.id, user.email, user.role);
    return res.status(200).json(token);
  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default register;
