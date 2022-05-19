import React, { ReactNode, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import links from '../../constants/links';
import { getDataAboutUser } from '../../store/modules/user/user.actions';

interface PrivateRouteTypes {
  component: any;
  path: string;
  exact?: boolean;
  children?: ReactNode;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteTypes> = ({ component: Component, ...rest }) => {
  const auth = useSelector((state: StoreState) => state.user.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataAboutUser());
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? (
          // eslint-disable-next-line react/prop-types
          <Redirect to={{ pathname: `${links.home}`, search: `signIn=${auth}`, state: { from: props.location } }} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};
export default PrivateRoute;
