import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import links from '../../constants/links';
import './header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import { logOutUser, userUnauthenticated } from '../../store/modules/user/user.actions';
import { loginModalActivation, registrationModalActivation } from '../../store/modules/modals/modal.actions';
import styles from './header.module.scss';

const Header: React.FunctionComponent = () => {
  const auth = useSelector((state: StoreState) => state.user.auth);
  const dataAboutUser = useSelector((state: StoreState) => state.user.dataAboutUser);
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('root');
    dispatch(logOutUser());
    dispatch(userUnauthenticated());
  };
  const userAuth = () => {
    dispatch(loginModalActivation(true));
  };
  const userRegister = () => {
    dispatch(registrationModalActivation(true));
  };
  return (
    <header style={auth ? { transform: 'none' } : undefined}>
      <div className={styles.logo} style={auth ? { marginRight: '250px' } : undefined}>
        <a href={links.home}>LOGO LOGO</a>
        <div className={styles.description}>
          <h3>FEEL WELL</h3>
          <p>помощник по здоровью</p>
        </div>
      </div>
      <ul>
        <li>
          <Link to={links.home}>Главная</Link>
        </li>
        <li>
          <Link to={links.about}>О нас</Link>
        </li>
        <li>
          <Link to={links.recipes}>Рецепты</Link>
        </li>
        <li>
          <Link to={links.places}>Места</Link>
        </li>
        <li>
          <Link to={links.user}>{auth ? dataAboutUser.firstName : 'Кабинет'}</Link>
        </li>
        {auth ? (
          <li onClick={logOut}>Выйти</li>
        ) : (
          <>
            <li onClick={userAuth}>Авторизоваться</li>
            <li onClick={userRegister}>Зарегистрироваться</li>
          </>
        )}
      </ul>
    </header>
  );
};
export default Header;
