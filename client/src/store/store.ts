import recipesReducer from './modules/recipes/recipes.reducer';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  recipes: recipesReducer,
});
const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
export default store;
