import React from 'react';
import { Link } from 'react-router-dom';
import links from '../../constants/links';
import styles from './footer.module.scss';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <Link to={links.home}>Главная</Link>
        </li>
        <li>
          <Link to={links.health}>Здоровье</Link>
        </li>
        <li>
          <Link to={links.recipes}>Рецепты</Link>
        </li>
        <li>
          <Link to={links.places}>Места</Link>
        </li>
        <li className={styles.lastLi}>
          <Link to={links.user}>Кабинет</Link>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
