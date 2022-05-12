import { Request, Response } from 'express';

import CustomError from '../../../customError/customError';
import { getRepository } from 'typeorm';
import Users from '../../entity/user/users';

const getDataAboutUserPg = async (req: Request | any, res: Response) => {
  try {
    const user=await getRepository(Users).createQueryBuilder("users");
    const findUser=await user
      .where("id =:id", {id: req.query.id})
      .getOne();
    if (!findUser) {
      throw CustomError.forbiddenRequest('Something wrong');
    }
    res.status(200).json({ email: findUser.email, firstName: findUser.firstName, lastName: findUser.lastName });
  } catch (e: any) {
    const newError = new CustomError(e.name, e.status, e.message);
    const values = newError.values;
    res.status(values.status).json({ message: e.message });
  }
};
export default getDataAboutUserPg;