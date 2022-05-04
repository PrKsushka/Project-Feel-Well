import axios from 'axios';

export const getDataAboutPlaces = () => axios.get('http://localhost:3001/places');
export const getDataAboutPlacesSortedByPlaceOrCity = (value: string, city?: string) => {
  return axios.get(`http://localhost:3001/places?place=${value}&city=${city}`);
}
// export const sortDataAboutPlacesByCity = (city: string) => axios.get(`http://localhost:3001/places?city=${city}`);