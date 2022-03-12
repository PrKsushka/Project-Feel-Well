import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataAboutRecipes, getFavouriteRecipes } from '../../store/modules/recipes/recipes.actions';
import { ProductElement, StoreState } from '../../store/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import styles from './recipes.module.scss';
import InputGroup from '../../UI/inputGroup/inputGroup';
import SortPannel from '../../components/sortPannel/sortPannel';
import SortMenu from '../../UI/sortMenu/sortMenu';
import { meal } from '../../constants/sortMenu';
import { sortByRatingAscDesc } from '../../api/dataAboutRecipes';

type ObjTypes = {
  arr: Array<string>;
};
const Recipes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: StoreState) => getRecipes(state));
  useEffect(() => {
    dispatch(dataAboutRecipes());
  }, []);

  const handleClick = (elem: ProductElement) => {
    return dispatch(getFavouriteRecipes(elem));
  };
  const selectedVal = (e: any) => {
    console.log(e.target.value);
    dispatch(sortByRatingAscDesc(e.target.value));
  };
  const objForSortMenu = {
    arr: meal,
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
          <SortMenu obj={objForSortMenu} />
          <select onChange={selectedVal}>
            <option value={'asc'}>rating asc</option>
            <option value={'desc'}>rating desc</option>
          </select>
        </div>
        <div className={styles.products}>
          {data !== undefined
            ? data.map((el) => (
                <div key={el.id} className={styles.card}>
                  <img src={el.image} alt="Product image" />
                  <div onClick={() => handleClick(el)}>saved</div>
                  <div className={styles.mainText}>
                    <h3>{el.name}</h3>
                    <p>{el.time}</p>
                    <p>{el.rating}</p>
                  </div>
                </div>
              ))
            : 'Sorry there are no recipes'}
        </div>
      </div>
    </div>
  );
};
export default Recipes;
