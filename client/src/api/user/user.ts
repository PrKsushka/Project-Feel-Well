import { authHost, host } from './index';
import jwtDecode from 'jwt-decode';

export const registration = async (email: string, password: string, firstName: string, lastName: string) => {
  const response: any = await host.post('/register', { email, password, firstName, lastName, role: 'user' });
  localStorage.setItem('token', response.data);
  return jwtDecode(response.data);
};
export const authentication = async (email: string, password: string) => {
  const response: any = await host.post('/authenticate', { email, password });
  localStorage.setItem('token', response.data);
  return jwtDecode(response.data);
};
export const check = async () => {
  const response: any = await authHost.get('/auth');
  localStorage.setItem('token', response.data);
  return jwtDecode(response.data);
};
