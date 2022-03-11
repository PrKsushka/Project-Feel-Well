import axios from 'axios';

export const getDataAboutRecipes = () => axios.get('http://localhost:3001/recipes');

//for not include recipes
// http://localhost:3001/recipes?notInclude=овсянка&notInclude=клубника

//to find by breakfast/lunch
//http://localhost:3001/meal?includeRecipes=true&meal=breakfast

//find by meal id
//http://localhost:3001/meal?id=6218db36ce663f3926a0b973

//sort by rating asc desc
//http://localhost:3001/recipes?rating=desc

//if includeproducts and sort by category
//http://localhost:3001/categoryPlaces?includePlaces=true&placesCategory=cafe

//return all of the places
//http://localhost:3001/places

//search
//http://localhost:3001/recipes?name=almond
