import { Request, Response } from 'express';
import Measures from '../../models/recipes/measures';
import Products from '../../models/recipes/products';

const getDataAboutMeasures=async (req: Request, res: Response)=>{
  try{
    const result=Measures.find({});
    res.status(200).json(result)
  }catch (e){

  }
}
const getDataAboutProducts=async (req: Request, res: Response)=>{
  try{
    const result=Products.find({});
    res.status(200).json(result)
  }catch (e){

  }
}
export default {getDataAboutMeasures, getDataAboutProducts};