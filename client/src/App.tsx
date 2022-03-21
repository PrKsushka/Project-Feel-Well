import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Recipes from './pages/recipes/recipes';
import About from './pages/about/about';
import links from './constants/links';
import Layout from './components/layout/layout';
import { check } from './api/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthenticated, userUnauthenticated } from './store/modules/user/user.actions';
import PrivateRoute from './components/privateRoute/privateRoute';
import { StoreState } from './store/types';
import User from './pages/user/user';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: StoreState) => state.user.auth);
  useLayoutEffect(() => {
    check()
      .then((data) => {
        dispatch(userAuthenticated());
      })
      .catch((err) => {
        dispatch(userUnauthenticated(err.message));
      });
  }, [isLogin]);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={links.home} component={Home} />
          <PrivateRoute exact path={links.recipes} component={Recipes} />
          <PrivateRoute exact path={links.about} component={About} />
          <PrivateRoute exact path={links.user} component={User} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
