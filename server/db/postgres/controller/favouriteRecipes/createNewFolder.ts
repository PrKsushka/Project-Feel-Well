import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Folders from '../../entity/favouriRecipes/folders';

const createNewFolder=async (req: Request | any, res: Response)=>{
  try{
    const folder=await getRepository(Folders).createQueryBuilder('folders');
    await folder.insert().into(Folders)
      .values({user:()=> String(req.user.id), folder: req.body.folder, color: req.body.color})
      .execute();
    res.status(200).json({message: 'folder created successfully'})
  }catch (e){
    res.status(500).json({ message: e.message });
  }
}
export default createNewFolder;