import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import { Equal, getManager, getRepository, In, Like, Not } from 'typeorm';
import connectionToPostgresDataBase from '../../db';
import Recipes from '../../entity/recipes';
import { Products } from '../../entity/products';
import { Ingredients } from '../../entity/ingredients';


const getDataAboutRecipes = async (req: Request, res: Response) => {
  try {

    const recipes = await getRepository(Recipes).createQueryBuilder('recipes');
    let result;

    if (req.query.param) {
      result = await recipes
        .leftJoinAndSelect('recipes.meal', 'meals')
        .leftJoinAndSelect('recipes.ingredients', 'ingredients')
        .leftJoinAndSelect('ingredients.product', 'products')
        .leftJoinAndSelect('ingredients.measure', 'measures')
        .select(['recipes.id', 'recipes.name', 'recipes.title', 'recipes.time', 'recipes.createdAt', 'recipes.rating', 'recipes.video', 'recipes.image', 'recipes.kcal', 'recipes.carbodygrate', 'recipes.fats', 'recipes.proteins', 'ingredients.id', 'ingredients.count', 'products.product', 'measures.measure', 'meals.meal'])
        .getMany();

      if (req.query.notInclude) {
        const notInclude = req.query.notInclude;
        const newArr = [];
        if (notInclude instanceof Array && notInclude.length >= 2) {
          for (let i = 0; i < notInclude.length; i++) {
            newArr.push(notInclude[i]);
          }
          const firstSubqueryArr = [];
          result = await recipes
            .where((qb) => {
              for (let i = 0; i < newArr.length; i++) {
                const t = qb.subQuery()
                  .select('products.id')
                  .from(Products, 'products')
                  .where(`products.product='${newArr[i]}'`)
                  .getQuery();
                firstSubqueryArr.push(t);
              }

              let subQueryFirst: any = qb.subQuery()
                .select(`"recipes_ingredients_ingredients"."recipesId"`)
                .from('recipes_ingredients_ingredients', 'recipes_ingredients_ingredients')
                .from('ingredients', 'ingredients')
                .where(`"recipes_ingredients_ingredients"."ingredientsId"=ingredients.id `)
                .andWhere(`"ingredients"."productId"=${firstSubqueryArr[0]}`)
                .getQuery();

              let subQuerySecond: any = qb.subQuery()
                .select(`"recipes_ingredients_ingredients"."recipesId"`)
                .from('recipes_ingredients_ingredients', 'recipes_ingredients_ingredients')
                .from('ingredients', 'ingredients')
                .andWhere(`"ingredients"."productId"=${firstSubqueryArr[1]}`)
                .getQuery();

              return 'recipes.id NOT IN' + subQueryFirst + ' AND recipes.id NOT IN' + subQuerySecond;
            })
            .getMany();

        } else {
          result = await recipes
            .where((qb) => {
              const firstSubQuery = qb.subQuery()
                .select('products.id')
                .from(Products, 'products')
                .where(`products.product='${notInclude}'`)
                .getQuery();
              const subQuery = qb.subQuery()
                .select(`"recipes_ingredients_ingredients"."recipesId"`)
                .from('recipes_ingredients_ingredients', 'recipes_ingredients_ingredients')
                .from('ingredients', 'ingredients')
                .where(`"recipes_ingredients_ingredients"."ingredientsId"=ingredients.id `)
                .andWhere(`"ingredients"."productId"=${firstSubQuery}`)
                .getQuery();
              return 'recipes.id NOT IN' + subQuery;
            })
            .getMany();
        }
      }
    }
    if (req.query.rating === 'asc') {
      result=await recipes
        .orderBy('recipes.rating', 'ASC')
        .getMany()
    } else if (req.query.rating === 'desc') {
      result=await recipes
        .orderBy('recipes.rating', 'DESC')
        .getMany()
    }
    if (req.query.meal) {
      result=await recipes
        .where("meals.meal = :meal", {meal: req.query.meal})
        .getMany()

    }

    res.status(200).json(result);

  } catch (e: any) {
    const error = new CustomError(e.name, e.status, e.message);
    res.status(error.statusVal).json({ message: error.messageVal });
  }
};
export default getDataAboutRecipes;
