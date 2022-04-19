import axios from 'axios';

export const changeDataAboutUser = (firstName: string, lastName: string) =>
  axios.put('http://localhost:3001/changeDataAboutUser', {
    firstName,
    lastName,
  });
export const changePassword = (oldPassword: string, newPassword: string) =>
  axios.put('http://localhost:3001/changePassword', {
    oldPassword,
    newPassword,
  });
