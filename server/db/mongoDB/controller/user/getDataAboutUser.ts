import { Request, Response } from 'express';
import User from '../../models/user';
import CustomError from '../../../customError/customError';

const getDataAboutUser = async (req: Request | any, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      throw CustomError.forbiddenRequest('Something wrong');
    }
    res.status(200).json({ email: user.email, firstName: user.firstName, lastName: user.lastName });
  } catch (e: any) {
    const newError = new CustomError(e.name, e.status, e.message);
    const values = newError.values;
    res.status(values.status).json({ message: e.message });
  }
};
export default getDataAboutUser;