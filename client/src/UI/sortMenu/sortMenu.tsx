import React from 'react';
import { ObjTypes } from '../types';
import style from './sortMenu.module.scss';

const SortMenu: React.FunctionComponent<ObjTypes> = ({ obj }) => {
  return (
    <ul onClick={obj.sortFunc} className={style.sortMenu} style={obj.styleOptions ? { marginRight: `${obj.styleOptions}px` } : undefined}>
      {obj.arr.map((el, i) => (
        <li key={i}>
          <a>{el}</a>
        </li>
      ))}
    </ul>
  );
};
export default SortMenu;
