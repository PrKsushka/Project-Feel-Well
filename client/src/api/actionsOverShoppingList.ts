import { authHost } from './user';

export const getFullDataAboutShoppingList = async () => await authHost.get('/getDataAboutShoppingList');

export const savePositionToShoppingList = async (position: string) => await authHost.post('/saveToShoppingList', { position });

export const deletePositionFromShoppingList = async (position: string) => authHost.post('/deleteFromShoppingList', { position });
