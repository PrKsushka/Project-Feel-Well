import React from 'react';
import { Link } from 'react-router-dom';
import links from '../../constants/links';

const Footer: React.FunctionComponent = () => {
  return (
    <>
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
    </>
  );
};
export default Footer;
