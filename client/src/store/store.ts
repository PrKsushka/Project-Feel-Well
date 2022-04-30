import recipesReducer from './modules/recipes/recipes.reducer';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './modules/user/user.reducer';
import ModalReducer from './modules/modals/modal.reducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import placesReducer from './modules/places/places.reducer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['recipes', 'user'],
};
const reducers = combineReducers({
  recipes: recipesReducer,
  user: userReducer,
  modal: ModalReducer,
  places: placesReducer,
});
const prstReducer = persistReducer(persistConfig, reducers);
const store = createStore(prstReducer, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);
export default { persistor, store };
