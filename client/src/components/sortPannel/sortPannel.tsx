import React, { useEffect, useState } from 'react';
import CheckboxGroup from '../../UI/checkboxGroup/checkboxGroup';
import arr from '../../constants/sortRecipes';
import styles from './sortPannel.module.scss';
import { getRecipesSortedByMeal } from '../../store/modules/recipes/recipes.actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import SelectGroup from '../../UI/selectGroup/selectGroup';

const SortPanel: React.FunctionComponent = () => {
  const [types, setTypes] = useState([]);
  const [vegetablesProd, setVegetablesProd] = useState([]);
  const [milkProd, setMilkProd] = useState([]);
  const [fruitsProd, setFruitsProd] = useState([]);
  const [backedGoodsProd, setBackedGoodsProd] = useState([]);
  const [meatProd, setMeatProd] = useState([]);
  const [selectRating, setSelectedRating] = useState('');
  const menuMeal = useSelector((state: StoreState) => state.recipes.meal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipesSortedByMeal(menuMeal, selectRating, ...vegetablesProd, ...milkProd, ...fruitsProd, ...backedGoodsProd, ...meatProd));
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
  const arrForRating = [
    ['asc', 'по возрастанию рейтинга'],
    ['desc', 'по убыванию рейтинга'],
  ];
  const objForSelectRating = {
    onChangeFunc: selectedVal,
    arr: arrForRating,
  };
  return (
    <>
      <div className={styles.mainSortColumn}>
        <h2 className={styles.mainTitle}>{menuMeal}</h2>
        <div>
          <SelectGroup obj={objForSelectRating} />
          <h3 className={styles.title}>Не содержит</h3>
          <p className={styles.variant}>Молочные продукты</p>
          <div className={styles.wrapperForInputGroup}>
            <CheckboxGroup obj={milkProducts} />
          </div>
          <p className={styles.variant}>Овощи</p>
          <div className={styles.wrapperForInputGroup}>
            <CheckboxGroup obj={vegetables} />
          </div>
          <p className={styles.variant}>Фрукты</p>
          <div className={styles.wrapperForInputGroup}>
            <CheckboxGroup obj={fruits} />
          </div>
          <p className={styles.variant}>Продукты, содержащие глютен</p>
          <div className={styles.wrapperForInputGroup}>
            <CheckboxGroup obj={bakedGoods} />
          </div>
          <p className={styles.variant}>Мясные продукты</p>
          <div className={styles.wrapperForInputGroup}>
            <CheckboxGroup obj={meatProducts} />
          </div>
          {/*<CheckboxGroup obj={objForInputGroupTypes} />*/}
        </div>
      </div>
    </>
  );
};
export default SortPanel;
