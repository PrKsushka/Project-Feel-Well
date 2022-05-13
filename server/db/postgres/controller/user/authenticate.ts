import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import bcrypt from 'bcrypt';
import TokenService from '../../../../utilsForToken/tokenService';
import { getRepository } from 'typeorm';
import Users from '../../entity/user/users';

const authenticatePg = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getRepository(Users).createQueryBuilder('users');

    const findUser = await user
      .leftJoinAndSelect('users.role', 'roles')
      .where('users.email=:email', { email: email })
      .getOne();

    if (!user) {
      throw CustomError.unauthorizedRequest('Пользователя с таким email не существует');
    }
    const comparePassword = bcrypt.compareSync(password, findUser.password);
    if (!comparePassword) {
      throw CustomError.unauthorizedRequest('Неверный пароль');
    }
    const token = TokenService.generateToken(findUser.id, findUser.email, 'user');
    const refreshToken = TokenService.refreshToken(findUser.id, findUser.email, 'user');
    return res.status(200).json({ token, refreshToken });
  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default authenticatePg;
