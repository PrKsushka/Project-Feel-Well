import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Recipes from './pages/recipes/recipes';
import About from './pages/about/about';
import links from './constants/links';
import Layout from './components/layout/layout';
import { check } from './api/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAboutUser, userAuthenticated, userUnauthenticated } from './store/modules/user/user.actions';
import PrivateRoute from './components/privateRoute/privateRoute';
import { StoreState } from './store/types/types';
import User from './pages/user/user';
import { loginModalActivation } from './store/modules/modals/modal.actions';
import RecipesDetail from './pages/recipesDetail/recipesDetail';
import SavedRecipes from './pages/savedRecipes/savedRecipes';
import Places from './pages/places/places';
import { getDataAboutFavouriteRecipes } from './store/modules/recipes/recipes.actions';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: StoreState) => state.user.auth);
  const body = document.getElementsByTagName('body')[0];

  useEffect(() => {
    if (isLogin) {
      check()
        .then((data) => {
          console.log(1);
          dispatch(userAuthenticated());
          dispatch(loginModalActivation(false));
          body.style.overflowY = 'auto';
        })
        .catch((err) => {
          console.log(2);
          dispatch(userUnauthenticated());
        });
    }
  }, [isLogin]);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={links.home} component={Home} />
          <PrivateRoute exact path={links.recipes} component={Recipes} />
          <PrivateRoute component={RecipesDetail} path={`${links.recipes}/:detailId`} />
          <PrivateRoute exact path={links.about} component={About} />
          <PrivateRoute exact path={links.places} component={Places} />
          <PrivateRoute exact path={links.user} component={User} />
          <PrivateRoute component={SavedRecipes} path={`${links.user}/:saved`} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
