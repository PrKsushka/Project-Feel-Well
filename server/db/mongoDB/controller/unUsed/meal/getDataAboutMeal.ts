import { Request, Response } from 'express';
import Meal from '../../../models/recipes/meal';
import { ObjectId } from 'mongodb';

const getDataAboutMeal = async (req: Request, res: Response) => {
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
    if (req.query.includeRecipes === 'true') {
      aggregateOptions = [
        ...aggregateOptions,
        {
          $lookup: {
            from: 'products',
            localField: 'meal',
            foreignField: 'mealId',
            as: 'recipes',
          },
        },
      ];
      if (req.query.meal) {
        aggregateOptions = [
          ...aggregateOptions,
          {
            $match: {
              meal: req.query.meal,
            },
          },
        ];
      }
    }
    const data = await Meal.aggregate(aggregateOptions);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default getDataAboutMeal;
