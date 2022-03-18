import recipesReducer from './modules/recipes/recipes.reducer';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './modules/user/user.reducer';
import ModalReducer from './modules/modals/modal.reducer';

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  recipes: recipesReducer,
  user: userReducer,
  modal: ModalReducer,
});
const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
export default store;
