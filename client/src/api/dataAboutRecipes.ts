import axios from 'axios';

export const getDataAboutRecipes = () => axios.get('http://localhost:3001/recipes');
