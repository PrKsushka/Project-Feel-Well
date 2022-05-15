import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import styles from './savedRecipes.module.scss';
import CardForRecipes from '../../components/card/module/cardForRecipes';
import { RecipeTypes } from '../../store/types/recipes.types';
import { getDataAboutFavouriteRecipes } from '../../store/modules/recipes/recipes.actions';

type Saved = {
  saved: string;
};
const SavedRecipes: React.FunctionComponent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { saved } = params as Saved;
  const directories = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  const dir = directories.find((el) => {
    return el[0] === saved;
  });
  const saveTargetElement = useRef();

  useEffect(() => {
    dispatch(getDataAboutFavouriteRecipes(saved));
  }, []);
  const favouriteRecipes = useSelector((state: StoreState) => state.recipes.favouriteRecipesWithDB);
  if (favouriteRecipes.length > 0) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.title}>{saved}</p>
        <div className={styles.cardWrapper}>
          {favouriteRecipes.map((el: RecipeTypes, i: number) => (
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
