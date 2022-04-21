import axios from 'axios';

export const getDataAboutRecipes = () => axios.get('http://localhost:3001/recipes');
// export const getRecipesNotIncludedComponents = (args: Array<string>) => {
//   const notInclude = '&notInclude=';
//   const arr: string[] = [];
//   for (let i = 0; i < args.length; i++) {
//     arr.push(notInclude + args[i]);
//   }
//   return axios.get(`http://localhost:3001/recipes?${arr.join('')}`);
// };
// export const sortByRatingAscDesc = (args: string[]) => {
//   const notInclude = '&notInclude=';
//   const arr: string[] = [`&rating=${args[0]}`];
//   for (let i = 1; i < args.length; i++) {
//     arr.push(notInclude + args[i]);
//   }
//   return axios.get(`http://localhost:3001/recipes?${arr.join('')}`);
// };
export const sortRecipes = (args: Array<string>) => {
  const notInclude = '&notInclude=';
  if (args[0] === 'все') {
    args[0] = '';
  }
  const arr: string[] = [`&meal=${args[0]}&rating=${args[1]}`];
  for (let i = 2; i < args.length; i++) {
    arr.push(notInclude + args[i]);
  }
  return axios.get(`http://localhost:3001/recipes?${arr.join('')}`);
};

export const findRecipesByName = (param: string) => axios.get(`http://localhost:3001/recipes?name=${param}`);

// export const sortRecipesByMeal = (value: string) => axios.get(`http://localhost:3001/meal?includeRecipes=true&meal=${value}`);
// export const findByMealId = (id: number) => axios.get(`http://localhost:3001/meal?id=${id}`);
// export const sortRecipesByRating = (val: string) => axios.get(`http://localhost:3001/recipes?rating=${val}`);
export const getThreeRandomRecipes=()=>axios.get(`http://localhost:3001/recipes?threeRandomProducts=true`);