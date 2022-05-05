import axios from 'axios';

export const changeDataAboutUser = (firstName: string, lastName: string) => {
  const token = localStorage.getItem('token');
  return axios.put(
    'http://localhost:3001/changeDataAboutUser',
    {
      firstName,
      lastName,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
export const changePassword = (oldPassword: string, newPassword: string) => {
  const token = localStorage.getItem('token');
  return axios.put(
    'http://localhost:3001/changePassword',
    {
      oldPassword,
      newPassword,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
