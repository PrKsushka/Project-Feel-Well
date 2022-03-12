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

//to find by breakfast/lunch
//http://localhost:3001/meal?includeRecipes=true&meal=breakfast
export const sortRecipesByMeal = (value: string) => axios.get(`http://localhost:3001/meal?includeRecipes=true&meal=${value}`);

//find by meal id
//http://localhost:3001/meal?id=6218db36ce663f3926a0b973
export const findByMealId = (id: number) => axios.get(`http://localhost:3001/meal?id=${id}`);

//sort by rating asc desc
//http://localhost:3001/recipes?rating=desc
export function sortByRatingAscDesc(
  param: string,
  param1?: string,
  param2?: string,
  param3?: string,
  param4?: string,
  param5?: string,
  param6?: string
) {
  axios.get(
    `http://localhost:3001/recipes?notInclude=${param1}&notInclude=${param2}&notInclude=${param3}&notInclude=${param4}&notInclude=${param5}&notInclude=${param6}&rating=${param}`
  );
}
//search
//http://localhost:3001/recipes?name=almond
export const findRecipesByName = (param: string) => axios.get(`http://localhost:3001/recipes?name=${param}`);
