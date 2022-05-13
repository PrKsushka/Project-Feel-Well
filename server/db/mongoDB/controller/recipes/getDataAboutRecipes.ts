import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import Recipes from '../../models/recipes/recipes';

const getDataAboutRecipes = async (req: Request, res: Response) => {
  try {
    let limit;
    let findOptions = {};
    let sortOptions = {};
    let matchOptions = {};
    if (req.query.name) {
      findOptions = {
        ...findOptions,
        $text: {
          $search: String(req.query.name),
          $caseSensitive: false
        }
      };
    }
    if (req.query.threeRandomProducts === 'true') {
      sortOptions = {
        ...sortOptions,
        _id: -1 + Math.floor(2 * Math.random())
      };
      limit = 3;
    }
    if (req.query.notInclude) {
      // {ingredients: {$not: {$elemMatch: {$or: [{"food":"strawberry"},{"food":"kabachok"}]}}}}
      // {ingredients: { $not: { $elemMatch: { $or: [{'product':{ 'product': "молоко" }}]}}}}
      const notInclude = req.query.notInclude;
      const newArr: object[] = [];
      if (notInclude instanceof Array && notInclude.length >= 2) {
        for (let i = 0; i < notInclude.length; i++) {
          newArr.push({ 'product': { 'product': notInclude[i] } });
        }
        findOptions = {
          ...findOptions,
          ingredients: {
            $not: { $elemMatch: { $or: newArr } }
          }
        };
      } else {
        findOptions = {
          ...findOptions,
          ingredients: { $not: { $elemMatch: { $or: [{ 'product': { 'product': notInclude } }] } } }
        };

      }
    }
    if (req.query.rating === 'asc') {
      findOptions = { ...findOptions };
      sortOptions = {
        ...sortOptions,
        rating: 1
      };
    } else if (req.query.rating === 'desc') {
      findOptions = { ...findOptions };
      sortOptions = {
        ...sortOptions,
        rating: -1
      };
    }
    if (req.query.meal) {
      matchOptions = {
        meal: req.query.meal
      };
    }
    let data = await Recipes.find(findOptions)
      .sort(sortOptions)
      .limit(Number(limit))
      .populate({
        path: 'meal',
        match: matchOptions
      })
      .populate({
        path: 'ingredients.measure'
      });
    data = data.filter((el) => {
      return (el.meal !== null) ? el : null;
    });
    res.status(200).json(data);
  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default getDataAboutRecipes;
