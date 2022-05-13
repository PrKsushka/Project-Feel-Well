import React, { lazy, useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dataAboutRecipes, setNameOfMeal } from '../../store/modules/recipes/recipes.actions';
import { StoreState } from '../../store/types/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import styles from './recipes.module.scss';
import SortPanel from '../../components/sortPannel/sortPannel';
import './card.css';
import SortMenu from '../../UI/sortMenu/sortMenu';
import { meal } from '../../constants/sortMenu';
import PopUp from '../../components/popUp/popUp';
import { MoonLoader } from 'react-spinners';
import { openPopUp } from '../../store/modules/modals/modal.actions';
import { useHistory } from 'react-router-dom';
import Warn from '../../components/warn/warn';
import links from '../../constants/links';
import CardForRecipes from '../../components/card/module/cardForRecipes';

const Card = lazy(() => import('../../components/card/card'));

const Recipes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: StoreState) => getRecipes(state));
  const showWindow = useSelector((state: StoreState) => state.modal.openPopUp);
  const time = useRef<number>(4000);
  const saveTargetElement: any = useRef();
  useEffect(() => {
    dispatch(dataAboutRecipes());
  }, []);
  useEffect(() => {
    const timerShowWindow = setTimeout(() => {
      dispatch(openPopUp(false));
    }, time.current);
    return () => clearTimeout(timerShowWindow);
  }, [showWindow]);

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
              {data.length !== 0 ? data.map((el) => <CardForRecipes el={el} obj={{ targetElem: saveTargetElement, param: true }} />) : <Warn />}
              {showWindow ? <PopUp elem={saveTargetElement.current} currentTime={time} /> : null}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default Recipes;