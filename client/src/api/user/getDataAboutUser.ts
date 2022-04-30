import axios from 'axios';

export const dataAboutUser = () => {
  const token = localStorage.getItem('token');
  return axios.get('http://localhost:3001/dataAboutUser', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
