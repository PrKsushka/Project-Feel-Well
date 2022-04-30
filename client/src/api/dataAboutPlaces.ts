import axios from 'axios';

export const getDataAboutPlaces = () => axios.get('http://localhost:3001/places');
export const getDataAboutPlacesSortedByPlace = (value: string) => axios.get(`http://localhost:3001/places?place=${value}`);
