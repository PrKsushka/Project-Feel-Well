import React, { useEffect, useRef, useState } from 'react';
import InputGroup from '../../UI/inputGroup/inputGroup';
import arr from '../../constants/sortRecipes';
import styles from './sortPannel.module.scss';
import { getRecipesSortedByMeal, sortedRecipesNotIncludeProducts, sortRecipesByRatingAscDesc } from '../../store/modules/recipes/recipes.actions';
import { useDispatch } from 'react-redux';
import SortMenu from '../../UI/sortMenu/sortMenu';
import { meal } from '../../constants/sortMenu';

const SortPannel: React.FunctionComponent = () => {
  const [types, setTypes] = useState('');
  const [vegetablesProd, setVegetablesProd] = useState('');
  const [milkProd, setMilkProd] = useState('');
  const [fruitsProd, setFruitsProd] = useState('');
  const [backedGoodsProd, setBackedGoodsProd] = useState('');
  const [meatProd, setMeatProd] = useState('');
  const [selectRating, setSelectedRating] = useState('');
  const [menuMeal, setMenuMeal] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectRating === 'asc' || selectRating === 'desc') {
      dispatch(sortRecipesByRatingAscDesc(selectRating, vegetablesProd, milkProd, fruitsProd, backedGoodsProd, meatProd));
    } else if (menuMeal !== '') {
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
  const menuClick = (e: any) => {
    setMenuMeal(e.target.textContent.toLowerCase());
  };
  const objForSortMenu = {
    arr: meal,
    sortFunc: menuClick,
  };
  return (
    <>
      <div className={styles.mainSortColumn}>
        <InputGroup obj={objForInputGroupTypes} />
        <InputGroup obj={milkProducts} />
        <InputGroup obj={vegetables} />
        <InputGroup obj={fruits} />
        <InputGroup obj={bakedGoods} />
        <InputGroup obj={meatProducts} />
        <select onChange={selectedVal}>
          <option selected disabled hidden>
            All
          </option>
          <option value={'asc'}>rating asc</option>
          <option value={'desc'}>rating desc</option>
        </select>
      </div>
      <SortMenu obj={objForSortMenu} />
    </>
  );
};
export default SortPannel;
