import { Request, Response } from 'express';
import Folders from '../../models/folders';

const getDataAboutFoldersMD = async (req: Request | any, res: Response) => {
  try {
    const result = await Folders.find({ user: req.user.id });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default getDataAboutFoldersMD;