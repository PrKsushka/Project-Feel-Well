import { Request, Response } from 'express';
import TokenService from './tokenService';
import CustomError from '../db/customError/customError';
import jwt from 'jsonwebtoken';

const refreshToken = async (req: Request | any, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw CustomError.forbiddenRequest('User is not authenticated');
    }
    jwt.verify(token, 'refresh', (err: any, user: any) => {
      if (!err) {
        const accessToken = TokenService.generateToken(user.id, user.username, user.role);
        return res.status(200).json(accessToken);
      } else {
        throw CustomError.forbiddenRequest('User is not authenticated');
      }
    });
  } catch (e: CustomError | any) {
    const newErr = new CustomError(e.name, e.status, e.message);
    const error = newErr.values;
    res.status(error.status).json({ message: error.message });
  }
};
export default refreshToken;
