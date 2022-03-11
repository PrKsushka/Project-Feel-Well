import React from 'react';
import { Link } from 'react-router-dom';
import links from '../../constants/links';
import './header.module.scss';

const Header: React.FunctionComponent = () => {
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
      </ul>
    </header>
  );
};
export default Header;
