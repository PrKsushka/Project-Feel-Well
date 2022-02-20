import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Recipes from './pages/recipes/recipes';
import About from './pages/about/about';
import links from './constants/links';
import Layout from './components/layout/layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={links.home} component={Home} />
          <Route exact path={links.recipes} component={Recipes} />
          <Route exact path={links.about} component={About} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
