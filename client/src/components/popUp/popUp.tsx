import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import React, { ReactNode } from 'react';
import { saveToAnotherDir } from '../../store/modules/recipes/recipes.actions';
interface PopUpTypes {
  elem: object;
  children?: ReactNode;
}
const PopUp: React.FunctionComponent<PopUpTypes> = (elem) => {
  const elems = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  const dispatch = useDispatch();
  const arr = [];
  for (let i = 0; i < elems.length; i++) {
    arr.push(elems[i][0]);
  }
  const handleClick = (e: any) => {
    dispatch(saveToAnotherDir(e.target.textContent, elem));
  };
  return (
    <div onClick={handleClick}>
      {arr.map((el, i) => (
        <div key={i}>{el}</div>
      ))}
    </div>
  );
};
export default PopUp;
