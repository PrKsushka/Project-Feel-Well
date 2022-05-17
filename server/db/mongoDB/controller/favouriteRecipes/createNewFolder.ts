import { Request, Response } from 'express';
import Folders from '../../models/folders';

const createNewFolderMD=async (req: Request | any, res: Response)=>{
  try{
    await Folders.create({user: req.user.id, folder: req.body.folder, color: req.body.color})
    res.status(200).json('Folder saved successfully')
  }catch (e){
    res.status(500).json({ message: e.message });
  }
}
export default createNewFolderMD;