import React from 'react';
import { Link } from 'react-router-dom';
import links from '../../constants/links';
import styles from './footer.module.scss';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <Link to={links.home}>Home</Link>
        </li>
        <li>
          <Link to={links.about}>About</Link>
        </li>
        <li>
          <Link to={links.places}>About</Link>
        </li>
        <li>
          <Link to={links.recipes}>Recipes</Link>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
