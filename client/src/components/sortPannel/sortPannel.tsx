import React, { useEffect, useRef, useState } from 'react';
import InputGroup from '../../UI/inputGroup/inputGroup';
import arr from '../../constants/sortRecipes';
import styles from './sortPannel.module.scss';
import { getRecipesSortedByMeal, sortedRecipesNotIncludeProducts, sortRecipesByRatingAscDesc } from '../../store/modules/recipes/recipes.actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types';

const SortPannel: React.FunctionComponent = () => {
  const [types, setTypes] = useState('');
  const [vegetablesProd, setVegetablesProd] = useState('');
  const [milkProd, setMilkProd] = useState('');
  const [fruitsProd, setFruitsProd] = useState('');
  const [backedGoodsProd, setBackedGoodsProd] = useState('');
  const [meatProd, setMeatProd] = useState('');
  const [selectRating, setSelectedRating] = useState('');
  const menuMeal = useSelector((state: StoreState) => state.recipes.meal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectRating === 'asc' || selectRating === 'desc') {
      dispatch(sortRecipesByRatingAscDesc(selectRating, vegetablesProd, milkProd, fruitsProd, backedGoodsProd, meatProd));
    }
    if (menuMeal !== '') {
      dispatch(getRecipesSortedByMeal(menuMeal, selectRating, vegetablesProd, milkProd, fruitsProd, backedGoodsProd, meatProd));
    } else {
      dispatch(sortedRecipesNotIncludeProducts(vegetablesProd, milkProd, fruitsProd, backedGoodsProd, meatProd));
    }
  }, [vegetablesProd, milkProd, fruitsProd, backedGoodsProd, meatProd, selectRating, menuMeal]);
  const objForInputGroupTypes = {
    arr: arr.typesArr,
    input: types,
    inputFunc: setTypes,
  };
  const milkProducts = {
    arr: arr.milkProductsArr,
    input: milkProd,
    inputFunc: setMilkProd,
  };
  const vegetables = {
    arr: arr.vegetablesArr,
    input: vegetablesProd,
    inputFunc: setVegetablesProd,
  };
  const fruits = {
    arr: arr.fruitsArr,
    input: fruitsProd,
    inputFunc: setFruitsProd,
  };
  const bakedGoods = {
    arr: arr.bakedGoodsArr,
    input: backedGoodsProd,
    inputFunc: setBackedGoodsProd,
  };
  const meatProducts = {
    arr: arr.meatProductsArr,
    input: meatProd,
    inputFunc: setMeatProd,
  };
  const selectedVal = (e: any) => {
    setSelectedRating(e.target.value);
  };
  return (
    <>
      <div className={styles.mainSortColumn}>
        <h2 className={styles.mainTitle}>{menuMeal}</h2>
        <InputGroup obj={objForInputGroupTypes} />
        <div>
          <h3 className={styles.title}>Не содержит</h3>
          <p className={styles.variant}>Молочные продукты</p>
          <div className={styles.wrapperForInputGroup}>
            <InputGroup obj={milkProducts} />
          </div>
          <p className={styles.variant}>Овощи</p>
          <div className={styles.wrapperForInputGroup}>
            <InputGroup obj={vegetables} />
          </div>
          <p className={styles.variant}>Фрукты</p>
          <div className={styles.wrapperForInputGroup}>
            <InputGroup obj={fruits} />
          </div>
          <p className={styles.variant}>Продукты, содержащие глютен</p>
          <div className={styles.wrapperForInputGroup}>
            <InputGroup obj={bakedGoods} />
          </div>
          <p className={styles.variant}>Мясные продукты</p>
          <div className={styles.wrapperForInputGroup}>
            <InputGroup obj={meatProducts} />
          </div>
        </div>
        <select onChange={selectedVal}>
          <option selected disabled hidden>
            All
          </option>
          <option value={'asc'}>rating asc</option>
          <option value={'desc'}>rating desc</option>
        </select>
      </div>
    </>
  );
};
export default SortPannel;
