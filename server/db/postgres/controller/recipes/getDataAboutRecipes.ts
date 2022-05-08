import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import { Equal, getRepository } from 'typeorm';
import connectionToPostgresDataBase from '../../db';
import Recipes from '../../entity/recipes';


const getDataAboutRecipes = async (req: Request, res: Response) => {
  try {
    let limit;
    let findOptions = {};
    if (req.query.param) {
      findOptions = {
        ...findOptions,
        join: {
          alias: 'recipes',
          where: {
            ingredientId: 'ingredients.id',
            'ingredientId.measureId': {id: 'measures.id'},
            'ingredientId.productId': {id: 'products.id'},
          },
        },
        relations: ['ingredientId', 'ingredientId.productId', 'ingredientId.measureId'],
        select: {
          'ingredientId':{
            'measureId': {
              id: false,
              measure: true
            },
            count: true,
            id: true,
            'productId': {
              id: false,
              product: true
            }
          }
        }
      };
      // let sortOptions = {};
      // if (req.query.name) {
      //   findOptions = {
      //     ...findOptions,
      //     $text: {
      //       $search: String(req.query.name),
      //       $caseSensitive: false
      //     }
      //   };
      // }
      // if (req.query.threeRandomProducts === 'true') {
      //   sortOptions = {
      //     ...sortOptions,
      //     _id: -1 + Math.floor(2 * Math.random())
      //   };
      //   limit = 3;
      // }
      // if (req.query.notInclude) {
      //   // {ingredients: {$not: {$elemMatch: {$or: [{"food":"strawberry"},{"food":"kabachok"}]}}}}
      //   const notInclude = req.query.notInclude;
      //   const newArr: object[] = [];
      //   if (notInclude instanceof Array && notInclude.length >= 2) {
      //     for (let i = 0; i < notInclude.length; i++) {
      //       newArr.push({ 'ingredient': notInclude[i] });
      //     }
      //     findOptions = {
      //       ...findOptions,
      //       ingredients: { $not: { $elemMatch: { $or: newArr } } }
      //     };
      //   } else {
      //     findOptions = {
      //       ...findOptions,
      //       ingredients: { $not: { $elemMatch: { $or: [{ 'ingredient': notInclude }] } } }
      //     };
      //
      //   }
      // }
      // if (req.query.rating === 'asc') {
      //   findOptions = { ...findOptions };
      //   sortOptions = {
      //     ...sortOptions,
      //     rating: 1
      //   };
      // } else if (req.query.rating === 'desc') {
      //   findOptions = { ...findOptions };
      //   sortOptions = {
      //     ...sortOptions,
      //     rating: -1
      //   };
      // }
      // if (req.query.meal) {
      //   findOptions = {
      //     ...findOptions,
      //     mealId: String(req.query.meal).toLowerCase()
      //   };
      // }
      const recipes = await getRepository(Recipes);
      const result = await recipes.find({ ...findOptions });
      res.status(200).json(result);
    }
  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default getDataAboutRecipes;
