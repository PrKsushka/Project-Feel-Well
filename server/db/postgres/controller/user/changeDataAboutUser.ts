import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Users from '../../entity/user/users';


const changeDataAboutUserPg = async (req: Request | any, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await getRepository(Users).createQueryBuilder('users');
    await user.update(Users)
      .set({firstName, lastName})
      .where("id=:id", {id:req.user.id}).execute()
    res.status(200).json({message: 'Data has been changes successfully'})
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default changeDataAboutUserPg;