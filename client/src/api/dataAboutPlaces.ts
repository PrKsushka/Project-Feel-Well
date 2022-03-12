import axios from 'axios';
//if includeproducts and sort by category
//http://localhost:3001/categoryPlaces?includePlaces=true&placesCategory=cafe
export const sortPlacesByCategory = (value: string) => axios.get(`http://localhost:3001/categoryPlaces?includePlaces=true&placesCategory=${value}`);

//return all of the places
//http://localhost:3001/places
export const getDataAboutPlaces = () => axios.get('http://localhost:3001/places');
