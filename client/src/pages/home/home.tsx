import React from 'react';
import styles from './home.module.scss';
import ModalForLogin from '../../components/modals/module/modalForLogin';
import { useHistory, useLocation } from 'react-router-dom';
import { loginModalActivation } from '../../store/modules/modals/modal.actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import ModalForRegistration from '../../components/modals/module/modalForRegistration';

type LocationStateTypes = {
  from: {
    pathname: string;
  };
};
const Home: React.FunctionComponent = () => {
  const auth = useSelector((state: StoreState) => state.user.auth);
  const history = useHistory();
  const location = useLocation();
  const locationState = location.state as LocationStateTypes;
  const dispatch = useDispatch();
  const loginModal = useSelector((state: StoreState) => state.modal.loginModal);
  const registrationModal = useSelector((state: StoreState) => state.modal.registrationModal);
  if (!auth && history.location.search === '?signIn=false') {
    dispatch(loginModalActivation(true));
  }
  if (auth) {
    if (locationState) {
      console.log(locationState);
      history.push(locationState.from.pathname);
    }
  }

  return (
    <div>
      <div className={styles.mainBanner}>
        <div className={styles.salads} />
        <div className={styles.desk} />
      </div>
      {loginModal ? <ModalForLogin /> : null}
      {registrationModal ? <ModalForRegistration /> : null}
    </div>
  );
};
export default Home;
