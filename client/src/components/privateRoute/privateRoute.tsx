import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import links from '../../constants/links';

interface PrivateRouteTypes {
  component: any;
  path: string;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteTypes> = ({ component: Component, path }) => {
  const isAuth = useSelector((state: StoreState) => state.user.auth);
  if (isAuth) {
    return <Route exact path={path} component={Component} />;
  } else {
    return <Redirect to={links.home} />;
  }
};
export default PrivateRoute;
