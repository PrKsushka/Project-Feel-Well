import axios from 'axios';

export const getDataAboutArticles = () => axios.get('http://localhost:3001/articles');
