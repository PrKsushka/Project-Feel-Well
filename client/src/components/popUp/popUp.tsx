import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import React, { ReactNode, useState } from 'react';
import { saveToAnotherDir } from '../../store/modules/recipes/recipes.actions';
import styles from './popUp.module.scss';
import { RecipeTypes } from '../../store/types/recipes.types';

interface PopUpTypes {
  elem: RecipeTypes;
  currentTime?: any;
  children?: ReactNode;
}
const PopUp: React.FunctionComponent<PopUpTypes> = (elem) => {
  const dispatch = useDispatch();
  const [directory, setDirectory] = useState<string>('basic');
  const folders=useSelector((state: StoreState)=> state.recipes.folders);

  const handleClick = (e: any) => {
    setDirectory(e.target.textContent);
    dispatch(saveToAnotherDir(e.target.textContent, elem));
  };
  return (
    <div onClick={handleClick} className={styles.popUp}>
      <p>Сохранено в папку {directory}</p>
      {folders.map((el, i) => (
        <div key={i} className={styles.savedCollection}>
          {el}
        </div>
      ))}
    </div>
  );
};
export default PopUp;
