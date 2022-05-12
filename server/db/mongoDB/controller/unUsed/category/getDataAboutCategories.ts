import { Request, Response } from 'express';
import Category from '../../../models/unUsed/category';
import { ObjectId } from 'mongodb';

const getDataAboutCategories = async (req: Request, res: Response) => {
  try {
    let aggregateOptions: Array<any> = [{ $sort: { _id: 1 } }];
    if (req.query.id) {
      aggregateOptions = [
        ...aggregateOptions,
        {
          $match: {
            _id: new ObjectId(String(req.query.id)),
          },
        },
      ];
    }
    if (req.query.includeProducts === 'true') {
      aggregateOptions = [
        ...aggregateOptions,
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'healthId',
            as: 'recipes',
          },
        },
      ];
      if (req.query.health) {
        aggregateOptions = [
          ...aggregateOptions,
          {
            $match: {
              health: req.query.health,
            },
          },
        ];
      }
    }
    const data = await Category.aggregate(aggregateOptions);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default getDataAboutCategories;
