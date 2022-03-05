import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataAboutRecipes } from '../../store/modules/recipes/recipes.actions';
import { StoreState } from '../../store/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';

const Recipes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataAboutRecipes());
  }, []);
  const data = useSelector((state: StoreState) => getRecipes(state));
  console.log(data);
  return <>recipes page</>;
};
export default Recipes;
