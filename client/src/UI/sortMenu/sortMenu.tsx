import React from 'react';
import { ObjTypes } from '../types';
import { useDispatch } from 'react-redux';
import { meal } from '../../constants/sortMenu';
import { getRecipesSortedByMeal } from '../../store/modules/recipes/recipes.actions';

const SortMenu: React.FunctionComponent<ObjTypes> = ({ obj }) => {
  const dispatch = useDispatch();
  const menuClick = (e: any) => {
    if (meal === obj.arr) {
      dispatch(getRecipesSortedByMeal(e.target.textContent.toLowerCase()));
    }
  };
  return (
    <ul onClick={menuClick}>
      {obj.arr.map((el, i) => (
        <li key={i}>{el}</li>
      ))}
    </ul>
  );
};
export default SortMenu;
