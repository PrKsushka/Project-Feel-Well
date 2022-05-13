import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Articles from '../../entity/articles/articles';
import CustomError from '../../../customError/customError';

const getDataAboutArticlesPg = async (req: Request, res: Response) => {
  try {
    const articles = await getRepository(Articles).createQueryBuilder('articles');
    let result = await articles
      .getMany();
    if(req.query.threeRandomArticles==='true'){
      result=await articles
        .orderBy('random()')
        .limit(3)
        .getMany()
    }
    res.status(200).json(result);
  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default getDataAboutArticlesPg;