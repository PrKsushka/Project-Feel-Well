//http://localhost:3001/category?includeProducts=true&health=vegan
import axios from 'axios';

export const getDataAboutCategories = () => axios.get('http://localhost:3001/category');
export const getRecipesByCategories = () => axios.get(`http://localhost:3001/category?includeProducts=true`);
export const sortDataByHealth = (value: string) => axios.get(`http://localhost:3001/category?includeProducts=true&health=${value}`);
