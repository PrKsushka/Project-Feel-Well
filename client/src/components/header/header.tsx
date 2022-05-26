import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import links from '../../constants/links';
import './header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import { changeTheme, logOutUser, userUnauthenticated } from '../../store/modules/user/user.actions';
import { loginModalActivation, registrationModalActivation } from '../../store/modules/modals/modal.actions';
import styles from './header.module.scss';
import Store from '../../store/store';

const Header: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: StoreState) => state.user.auth);
  const dataAboutUser = useSelector((state: StoreState) => state.user.dataAboutUser);
  const header = useRef<HTMLElement>(null);
  const circle = useRef<HTMLDivElement>(null);
  const darkOrLightTheme = useSelector((state: StoreState) => state.user.lightOrDarkTheme);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('new');
    dispatch(logOutUser());
    dispatch(userUnauthenticated());
  };
  const userAuth = () => {
    dispatch(loginModalActivation(true));
  };
  const userRegister = () => {
    dispatch(registrationModalActivation(true));
  };

  useEffect(() => {
    if (circle.current && header.current) {
      if (darkOrLightTheme) {
        circle.current.className = `${styles.right}`;
        document.body.style.background = '#8a9d74';
        if (circle.current.parentElement) {
          circle.current.parentElement.className = `${styles.switch} ${styles.lightBorder}`;
        }
        if (window.scrollY !== 0) {
          header.current.className = `${styles.headerInMove} ${styles.light}`;
        } else {
          header.current.className = '';
        }
      } else if (!darkOrLightTheme) {
        circle.current.className = `${styles.circle}`;
        document.body.style.background = '#0C1715';
        if (circle.current.parentElement) {
          circle.current.parentElement.className = `${styles.switch} ${styles.darkBorder}`;
        }
        if (window.scrollY !== 0) {
          header.current.className = `${styles.headerInMove} ${styles.dark}`;
        } else {
          header.current.className = '';
        }
      }
    }
  }, [darkOrLightTheme]);
  const moveCircle = () => {
    dispatch(changeTheme(!darkOrLightTheme));
  };

  const scrollHeader = () => {
    const { current } = header;
    if (current) {
      if (window.scrollY >= 30 && !darkOrLightTheme) {
        current.className = `${styles.headerInMove} ${styles.dark}`;
      } else if (window.scrollY >= 30 && darkOrLightTheme) {
        current.className = `${styles.headerInMove} ${styles.light}`;
      } else {
        current.className = '';
      }
    }
  };
  window.addEventListener('scroll', scrollHeader);

  return (
    <header ref={header}>
      <div className={styles.logo}>
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
        <li className={styles.lastLi}>
          <Link to={links.user}>{auth ? dataAboutUser.firstName : 'Кабинет'}</Link>
        </li>
        {auth ? (
          <>
            <div className={`${styles.switch} ${styles.darkBorder}`}>
              <div className={styles.circle} onClick={moveCircle} ref={circle}></div>
            </div>
            <button type="button" onClick={logOut} className={styles.menuButton}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={userAuth} className={styles.menuButton}>
              Авторизоваться
            </button>
            <button type="button" onClick={userRegister} className={styles.menuButton}>
              Зарегистрироваться
            </button>
          </>
        )}
      </ul>
    </header>
  );
};
export default Header;
