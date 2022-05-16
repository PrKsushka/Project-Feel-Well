import { Request, Response } from 'express';
import Measures from '../../models/recipes/measures';
import Products from '../../models/recipes/products';
import CustomError from '../../../customError/customError';

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
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
}

export default {getDataAboutMeasures, getDataAboutProducts};