import { NextFunction, Request, Response } from 'express';
import CustomError from '../db/customError/customError';
import jwt from 'jsonwebtoken';

const auth = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw CustomError.unauthorizedRequest('Не авторизован');
    }
    const decoded = jwt.verify(token, 'access');
    req.user = decoded;
    next();
  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default auth;
