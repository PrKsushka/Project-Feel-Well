import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProductElement, StoreState } from '../../store/types';
import Card from '../../components/card/card';
import styles from './savedRecipes.module.scss';
import CardForRecipes from '../../components/card/module/cardForRecipes';

type Saved = {
  saved: string;
};
const SavedRecipes: React.FunctionComponent = () => {
  const params = useParams();
  const { saved } = params as Saved;
  const directories = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  const dir = directories.find((el) => {
    return el[0] === saved;
  });
  const saveTargetElement = useRef();
  if (dir[1].length > 0) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.title}>{saved}</p>
        <div className={styles.cardWrapper}>
          {dir[1].map((el: ProductElement, i: number) => (
            <CardForRecipes el={el} obj={{ targetElem: saveTargetElement, param: true }} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <p className={styles.title}>Папка пуста. Cохрани рецепты в коллекцию {saved}</p>
      </div>
    );
  }
};
export default SavedRecipes;
