import { Request, Response } from 'express';
import TokenService from './tokenService';

const refreshToken = async (req: Request | any, res: Response) => {
  const token = TokenService.generateToken(req.user.id, req.user.email, req.user.role);
  return res.status(200).json(token);
};
export default refreshToken;
