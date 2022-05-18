import { authHost } from './user';

export const getDataAboutShoppingList = async () => await authHost.get('/getDataAboutShoppingList');

export const saveToShoppingList = async (position: string) => await authHost.post('/saveToShoppingList', { position });

export const deleteFromShoppingList = async (position: string) => authHost.post('/deleteFromShoppingList', { position });
