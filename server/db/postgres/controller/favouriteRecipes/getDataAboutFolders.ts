import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Folders from '../../entity/favouriRecipes/folders';

const getDataAboutFolders = async (req: Request | any, res: Response) => {
  try {
    const folders = await getRepository(Folders).createQueryBuilder('folders');
    const result = await folders
      .where('folders.userId=:id', { id: req.user.id })
      .getMany();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default getDataAboutFolders;