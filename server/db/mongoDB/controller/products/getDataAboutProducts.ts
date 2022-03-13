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
        $text: {
          $search: String(req.query.name),
          $caseSensitive: false,
        },
      };
    }
    if (req.query.threeRandomProducts === 'true') {
      sortOptions = {
        ...sortOptions,
        _id: -1 + Math.floor(2 * Math.random()),
      };
      limit = 3;
    }
    if (req.query.notInclude) {
      const notInclude = req.query.notInclude;
      if (notInclude instanceof Array && notInclude.length >= 2) {
        findOptions = {
          ...findOptions,
          ingredients: {
            $nin: [...notInclude],
          },
        };
      } else {
        findOptions = {
          ...findOptions,
          ingredients: {
            $nin: [notInclude],
          },
        };
      }
    }
    if (req.query.rating === 'asc') {
      findOptions = { ...findOptions };
      sortOptions = {
        ...sortOptions,
        rating: 1,
      };
    } else if (req.query.rating === 'desc') {
      findOptions = { ...findOptions };
      sortOptions = {
        ...sortOptions,
        rating: -1,
      };
    }
    if (req.query.meal) {
      findOptions = {
        ...findOptions,
        mealId: String(req.query.meal).toLowerCase(),
      };
    }
    const data = await Products.find(findOptions).sort(sortOptions).limit(Number(limit));
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'ERR' });
  }
};
export default getDataAboutProducts;
