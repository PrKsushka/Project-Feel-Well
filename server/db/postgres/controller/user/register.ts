import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import bcrypt from 'bcrypt';
import TokenService from '../../../../utilsForToken/tokenService';
import { getRepository } from 'typeorm';
import Users from '../../entity/user/users';

const registerPg = async (req: Request, res: Response) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;
    const user = await getRepository(Users).createQueryBuilder('users');

    if (!email || !password) {
      throw CustomError.unauthorizedRequest('Некооректно введен пароль или email');
    }
    const person = await user
      .where('users.email=:email', { email: email })
      .getOne();

    if (person) {
      throw CustomError.unauthorizedRequest('Пользователь с таким email уже существует');
    }
    const hashPassword = await bcrypt.hash(String(password), 5);
    const newUser = await user
      .insert()
      .into(Users)
      .values({ email: email, password: hashPassword, firstName: firstName, lastName: lastName, role: () => "1"})
      .execute();
    const findNewUser = await user
      .where('users.email=:email', { email: email })
      .getOne();
    const token = TokenService.generateToken(findNewUser.id, findNewUser.email, 'user');
    return res.status(200).json(token);
  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default registerPg;
