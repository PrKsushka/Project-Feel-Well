import axios from 'axios';

export const getDataAboutRecipes = () => axios.get('http://localhost:3001/recipes');

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
export const getThreeRandomRecipes = () => axios.get(`http://localhost:3001/recipes?threeRandomProducts=true`);
