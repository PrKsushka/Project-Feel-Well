import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import React, { ReactNode, useState } from 'react';
import { saveToAnotherDir } from '../../store/modules/recipes/recipes.actions';
import styles from './popUp.module.scss';

interface PopUpTypes {
  elem: object;
  currentTime?: any;
  children?: ReactNode;
}
const PopUp: React.FunctionComponent<PopUpTypes> = (elem) => {
  const elems = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  const dispatch = useDispatch();
  const [directory, setDirectory] = useState<string>('basic');
  const arr = [];
  for (let i = 0; i < elems.length; i++) {
    arr.push(elems[i][0]);
  }
  const handleClick = (e: any) => {
    setDirectory(e.target.textContent);
    dispatch(saveToAnotherDir(e.target.textContent, elem));
  };
  return (
    <div onClick={handleClick} className={styles.popUp}>
      <p>Сохранено в папку {directory}</p>
      {arr.map((el, i) => (
        <div key={i} className={styles.savedCollection}>
          {el}
        </div>
      ))}
    </div>
  );
};
export default PopUp;
