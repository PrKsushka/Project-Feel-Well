import React, { lazy, useEffect, useRef, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataAboutRecipes, setNameOfMeal } from '../../store/modules/recipes/recipes.actions';
import { StoreState } from '../../store/types';
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

const Card = lazy(() => import('../../components/card/card'));

const Recipes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: StoreState) => getRecipes(state));
  const showWindow = useSelector((state: StoreState) => state.modal.openPopUp);

  const saveTargetElement: any = useRef();
  useEffect(() => {
    dispatch(dataAboutRecipes());
  }, []);
  const history = useHistory();
  useEffect(() => {
    let time = 6000;
    if (history.action === 'PUSH') {
      time = 1;
    }
    const timerShowWindow = setTimeout(() => {
      dispatch(openPopUp(false));
    }, time);
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
              {data.length !== 0
                ? data.map((el) => (
                    <Card key={el._id} el={el} obj={{ targetElem: saveTargetElement, param: true }}>
                      <div className={styles.ratingSec}>
                        <p>
                          {el.time}
                          &nbsp;
                          {el.time && el.time < 60 ? 'мин' : 'ч'}
                        </p>
                        <p>{el.rating}</p>
                      </div>
                    </Card>
                  ))
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
