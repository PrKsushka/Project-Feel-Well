import React from 'react';
import { ObjTypes } from '../types';

const SortMenu: React.FunctionComponent<ObjTypes> = ({ obj }) => {
  return (
    <ul onClick={obj.sortFunc}>
      {obj.arr.map((el, i) => (
        <li key={i}>{el}</li>
      ))}
    </ul>
  );
};
export default SortMenu;
