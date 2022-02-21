import { Request, Response } from 'express';
import Products from '../../models/products/products';

const getDataAboutProducts = async (req: Request, res: Response) => {
  try {
    let findOption = {};
    if (req.query.name) {
      console.log(req.query.name);

      findOption = {
        ...findOption,
        $text: { $search: String(req.query.name) },
      };
    }
    const data = await Products.find(findOption);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'ERR' });
  }
};
export default getDataAboutProducts;
