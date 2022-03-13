import axios from 'axios';

export const sortPlacesByCategory = (value: string) => axios.get(`http://localhost:3001/categoryPlaces?includePlaces=true&placesCategory=${value}`);

export const getDataAboutPlaces = () => axios.get('http://localhost:3001/places');
