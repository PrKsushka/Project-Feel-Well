import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Recipes from './pages/recipes/recipes';
import About from './pages/about/about';
import links from './constants/links';
import Layout from './components/layout/layout';
import { check } from './api/user/user';
import { useDispatch } from 'react-redux';
import { userAuthenticated } from './store/modules/user/user.actions';
import PrivateRoute from './components/privateRoute/privateRoute';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('1');
    check().then((data) => {
      dispatch(userAuthenticated());
    });
  }, []);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={links.home} component={Home} />
          <PrivateRoute component={Recipes} path={links.recipes} />
          <PrivateRoute component={About} path={links.about} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
