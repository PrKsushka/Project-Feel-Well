import express from 'express';
import saveToShoppingList from '../../postgres/controller/shoppingList/saveToShoppingList';
import deleteFromShoppingList from '../../postgres/controller/shoppingList/deleteFromShoppingList';
import auth from '../../../utilsForToken/checkIfAuth';
import getDataAboutShoppingList from '../../postgres/controller/shoppingList/getDataAboutShoppingList';
import saveToShoppingListMD from '../../mongoDB/controller/shoppingList/saveToShoppingList';
import deleteFromShoppingListMD from '../../mongoDB/controller/shoppingList/deleteFromShoppingList';
import getDataAboutShoppingListMD from '../../mongoDB/controller/shoppingList/getDataAboutShoppingList';

const shoppingListPostgres = express.Router();
shoppingListPostgres.post('/saveToShoppingList', auth, saveToShoppingList);
shoppingListPostgres.post('/deleteFromShoppingList', auth, deleteFromShoppingList);
shoppingListPostgres.get('/getDataAboutShoppingList', auth, getDataAboutShoppingList);

const shoppingListMongodb=express.Router();
shoppingListMongodb.post('/saveToShoppingList', auth, saveToShoppingListMD);
shoppingListMongodb.post('/deleteFromShoppingList', auth, deleteFromShoppingListMD);
shoppingListMongodb.get('/getDataAboutShoppingList', auth, getDataAboutShoppingListMD);

export default { shoppingListPostgres, shoppingListMongodb };