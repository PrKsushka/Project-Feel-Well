import React, { useEffect, useRef, useState } from 'react';
import InputGroup from '../../UI/inputGroup/inputGroup';
import arr from '../../constants/sortRecipes';
import styles from './sortPannel.module.scss';
import { sortedRecipesNotIncludeProducts } from '../../store/modules/recipes/recipes.actions';
import { useDispatch } from 'react-redux';

const SortPannel: React.FunctionComponent = () => {
  const [types, setTypes] = useState('');
  const [vegetablesProd, setVegetablesProd] = useState('');
  const [milkProd, setMilkProd] = useState('');
  const [fruitsProd, setFruitsProd] = useState('');
  const [backedGoodsProd, setBackedGoodsProd] = useState('');
  const [meatProd, setMeatProd] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sortedRecipesNotIncludeProducts(vegetablesProd, milkProd, fruitsProd, backedGoodsProd, meatProd));
  }, [vegetablesProd, milkProd, fruitsProd, backedGoodsProd, meatProd]);
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
  return (
    <div className={styles.mainSortColumn}>
      <InputGroup obj={objForInputGroupTypes} />
      <InputGroup obj={milkProducts} />
      <InputGroup obj={vegetables} />
      <InputGroup obj={fruits} />
      <InputGroup obj={bakedGoods} />
      <InputGroup obj={meatProducts} />
    </div>
  );
};
export default SortPannel;
