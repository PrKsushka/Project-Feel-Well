import { Request, Response } from 'express';
import Articles from '../../models/articles';

const getDataAboutArticles = async (req: Request, res: Response) => {
  try {
    let limit;
    let sortOptions = {};
    if (req.query.threeRandomArticles === 'true') {
      sortOptions = {
        ...sortOptions,
        _id: -1 + Math.floor(2 * Math.random()),
      };
      limit = 3;
    }
    const data = await Articles.find({}).sort(sortOptions).limit(Number(limit));
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'ERR' });
  }
};
export default getDataAboutArticles;
