import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataAboutRecipes, getFavouriteRecipes, setNameOfMeal } from '../../store/modules/recipes/recipes.actions';
import { ProductElement, StoreState } from '../../store/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import styles from './recipes.module.scss';
import SortPannel from '../../components/sortPannel/sortPannel';
import './card.css';
import SortMenu from '../../UI/sortMenu/sortMenu';
import { meal } from '../../constants/sortMenu';

const Recipes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: StoreState) => getRecipes(state));
  useEffect(() => {
    dispatch(dataAboutRecipes());
  }, []);
  const newRef: any = React.createRef();
  const handleClick = (elem: ProductElement) => (e: any) => {
    if (e.target) {
      e.target.style.backgroundImage = `url(${require(`../../assets/save_orange.png`)}`;
    }
    return dispatch(getFavouriteRecipes(elem));
  };
  const menuClick = (e: any) => {
    console.log('1');
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
          <SortPannel />
        </div>
        <div className={styles.rightProdColumn}>
          <SortMenu obj={objForSortMenu} />
          <div className={styles.products}>
            {data.length !== 0
              ? data.map((el) => (
                  <div key={el.id} className={styles.card} ref={newRef}>
                    <div style={{ backgroundImage: `url(${require(`../../${el.image}`)}` }} className={styles.image} />
                    <div data-id={el.id} onClick={handleClick(el)} className="save" />
                    <div className={styles.mainText}>
                      <h3>{el.name}</h3>
                      <div className={styles.ratingSec}>
                        <p>{el.time}</p>
                        <p>{el.rating}</p>
                      </div>
                    </div>
                  </div>
                ))
              : 'Sorry there are no recipes'}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recipes;
