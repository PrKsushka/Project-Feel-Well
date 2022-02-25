import { Request, Response } from 'express';
import Products from '../../models/products';

const getDataAboutProducts = async (req: Request, res: Response) => {
  try {
    let limit;
    let findOptions = {};
    let sortOptions = {};
    if (req.query.name) {
      findOptions = {
        ...findOptions,
        $text: { $search: String(req.query.name) },
      };
    }
    if (req.query.threeRandomProducts === 'true') {
      sortOptions = {
        ...sortOptions,
        _id: -1 + Math.floor(2 * Math.random()),
      };
      limit = 3;
    }
    const data = await Products.find(findOptions).sort(sortOptions).limit(Number(limit));
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'ERR' });
  }
};
export default getDataAboutProducts;
