import React, { lazy, useEffect, useRef, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataAboutRecipes, getFavouriteRecipes, setNameOfMeal, unsavedFromFavouriteRecipes } from '../../store/modules/recipes/recipes.actions';
import { ProductElement, StoreState } from '../../store/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import styles from './recipes.module.scss';
import SortPanel from '../../components/sortPannel/sortPannel';
import './card.css';
import SortMenu from '../../UI/sortMenu/sortMenu';
import { meal } from '../../constants/sortMenu';
import PopUp from '../../components/popUp/popUp';
import { MoonLoader } from 'react-spinners';

const Card = lazy(() => import('../../components/card/card'));

const Recipes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: StoreState) => getRecipes(state));
  const [showWindow, setShowWindow] = useState(false);
  const saveTargetElement: any = useRef();
  useEffect(() => {
    dispatch(dataAboutRecipes());
  }, []);
  useEffect(() => {
    const timerShowWindow = setTimeout(() => {
      setShowWindow((prevState) => false);
    }, 10000);
    return () => clearTimeout(timerShowWindow);
  }, [showWindow]);

  const handleClick = (elem: ProductElement) => (e: any) => {
    if (e.target.className === 'saveClicked') {
      e.target.className = 'save';
      return dispatch(unsavedFromFavouriteRecipes(elem));
    }
    e.target.className = 'saveClicked';
    setShowWindow((prevState) => true);
    saveTargetElement.current = elem;
    dispatch(getFavouriteRecipes(elem));
  };
  const menuClick = (e: any) => {
    dispatch(setNameOfMeal(e.target.textContent.toLowerCase()));
  };
  const objForSortMenu = {
    arr: meal,
    sortFunc: menuClick,
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.darkGlass}>
        <div className={styles.textBlockWrapper}>Лучшие рецепты</div>
        <div className={styles.banner} />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.columnForSort}>
          <SortPanel />
        </div>
        <div className={styles.rightProdColumn}>
          <SortMenu obj={objForSortMenu} />
          <Suspense fallback={<MoonLoader />}>
            <div className={styles.products}>
              {data.length !== 0
                ? data.map((el) => <Card key={el._id} el={el} obj={{ clickFunc: handleClick, param: true }} />)
                : 'Sorry there are no recipes'}
              {showWindow ? <PopUp elem={saveTargetElement.current} /> : null}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default Recipes;
