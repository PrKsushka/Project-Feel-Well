import axios from 'axios';

export const getDataAboutRecipes = () => axios.get('http://localhost:3001/recipes');
export const getRecipesNotIncludedComponents = (
  param1: string,
  param2?: string,
  param3?: string,
  param4?: string,
  param5?: string,
  param6?: string
) =>
  axios.get(
    `http://localhost:3001/recipes?notInclude=${param1}&notInclude=${param2}&notInclude=${param3}&notInclude=${param4}&notInclude=${param5}&notInclude=${param6}`
  );
export const sortByRatingAscDesc = (
  param: string,
  param1?: string,
  param2?: string,
  param3?: string,
  param4?: string,
  param5?: string,
  param6?: string
) =>
  axios.get(
    `http://localhost:3001/recipes?notInclude=${param1}&notInclude=${param2}&notInclude=${param3}&notInclude=${param4}&notInclude=${param5}&notInclude=${param6}&rating=${param}`
  );
export const sortByMealHour = (
  meal: string,
  rating?: string,
  param1?: string,
  param2?: string,
  param3?: string,
  param4?: string,
  param5?: string,
  param6?: string
) =>
  axios.get(
    `http://localhost:3001/recipes?notInclude=${param1}&notInclude=${param2}&notInclude=${param3}&notInclude=${param4}&notInclude=${param5}&notInclude=${param6}&rating=${rating}&meal=${meal}`
  );
export const findRecipesByName = (param: string) => axios.get(`http://localhost:3001/recipes?name=${param}`);

export const sortRecipesByMeal = (value: string) => axios.get(`http://localhost:3001/meal?includeRecipes=true&meal=${value}`);
export const findByMealId = (id: number) => axios.get(`http://localhost:3001/meal?id=${id}`);
