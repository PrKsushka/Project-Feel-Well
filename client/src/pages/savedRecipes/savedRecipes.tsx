import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import styles from './savedRecipes.module.scss';
import CardForRecipes from '../../components/card/module/cardForRecipes';
import { RecipeTypes } from '../../store/types/recipes.types';
import { getDataAboutFavouriteRecipes } from '../../store/modules/recipes/recipes.actions';
import Loader from '../../components/loader/loader';
import useLoader from '../../hooks/useLoader';

type Saved = {
  saved: string;
};
const SavedRecipes: React.FunctionComponent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { saved } = params as Saved;
  const saveTargetElement = useRef();
  const [isLoading, activeLoader] = useLoader();
  useEffect(() => {
    const savedArr: string[] = saved.split('');
    for (let i = 0; i < savedArr.length; i++) {
      if (savedArr[i] === '%') {
        savedArr.splice(0, 3, ' ');
      }
    }
    const result: string = savedArr.join('');
    dispatch(getDataAboutFavouriteRecipes(result));
    window.scrollTo(0, 0);
  }, []);
  const favouriteRecipes = useSelector((state: StoreState) => state.recipes.favouriteRecipesWithDB);
  if (favouriteRecipes.length > 0) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.title}>{saved}</p>
        <div className={styles.cardWrapper} style={isLoading ? { display: 'none' } : undefined}>
          {favouriteRecipes.map((el: RecipeTypes, i: number) => (
            <CardForRecipes el={el} obj={{ targetElem: saveTargetElement, param: true }} key={el.id || el._id} />
          ))}
        </div>
        {isLoading ? <Loader /> : null}
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
