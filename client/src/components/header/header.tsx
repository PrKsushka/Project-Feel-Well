import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import links from '../../constants/links';
import './header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import { userUnauthenticated } from '../../store/modules/user/user.actions';
import { loginModalActivation, registrationModalActivation } from '../../store/modules/modals/modal.actions';
import ModalForLogin from '../modals/module/modalForLogin';
import ModalForRegistration from '../modals/module/modalForRegistration';

const Header: React.FunctionComponent = () => {
  const auth = useSelector((state: StoreState) => state.user.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(userUnauthenticated());
  };
  const userAuth = () => {
    dispatch(loginModalActivation(true));
  };
  const userRegister = () => {
    dispatch(registrationModalActivation(true));
  };
  const loginModal = useSelector((state: StoreState) => state.modal.loginModal);
  const registrationModal = useSelector((state: StoreState) => state.modal.registrationModal);
  return (
    <header>
      <ul>
        <li>
          <Link to={links.home}>Home</Link>
        </li>
        <li>
          <Link to={links.about}>About</Link>
        </li>
        <li>
          <Link to={links.recipes}>Recipes</Link>
        </li>
        <li>
          <Link to={links.user}>My own</Link>
        </li>
        {auth ? (
          <li onClick={logOut}>Выйти</li>
        ) : (
          <>
            <li onClick={userAuth}>Авторизоваться</li>
            <li onClick={userRegister}>Зарегистрироваться</li>
          </>
        )}
        {loginModal ? <ModalForLogin /> : null}
        {registrationModal ? <ModalForRegistration /> : null}
      </ul>
    </header>
  );
};
export default Header;
