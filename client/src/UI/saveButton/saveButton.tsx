import React, { useEffect, useState } from 'react';
import { ProductElement, StoreState } from '../../store/types';
import { getFavouriteRecipes, unsavedFromFavouriteRecipes } from '../../store/modules/recipes/recipes.actions';
import { useDispatch, useSelector } from 'react-redux';
import { openPopUp } from '../../store/modules/modals/modal.actions';

type Obj = {
  foundElem: boolean;
  setFoundElem: any;
  style: {
    top: string;
    right: string;
  };
  targetElem: any;
  saveStatus: any;
}

interface SaveButtonTypes {
  el: ProductElement;
  targetElem?: any;
  obj?: Obj;
  children?: React.ReactNode;
}

const SaveButton: React.FunctionComponent<SaveButtonTypes> = ({ el, targetElem, obj }) => {
  const dispatch = useDispatch();
  const favRecipes = useSelector((state: StoreState) => state.recipes.favouriteRecipes)[0];

  useEffect(() => {
    if (favRecipes[1]) {
      favRecipes[1].find((elem: ProductElement) => {
        if (obj && el._id === elem._id) {
          obj.setFoundElem(true);
        }
      });
    }
  }, []);

  const handleClick = (elem: ProductElement) => (e: any) => {
    if (e.target.className === 'saveClicked') {
      e.target.className = 'save';
      dispatch(openPopUp(false));
      obj && obj.saveStatus('Сохранить в избранное');
      return dispatch(unsavedFromFavouriteRecipes(elem));
    }

    e.target.className = 'saveClicked';
    dispatch(openPopUp(true));
    if (obj) {
      obj.targetElem.current = elem;
      obj.saveStatus('Сохранено в избранное');
    } else {
      targetElem.current = elem;
    }
    dispatch(getFavouriteRecipes(elem));
  };
  return <div style={obj ? obj.style : undefined} className={obj && obj.foundElem ? 'saveClicked' : 'save'}
              onClick={handleClick(el)} />;
};
export default SaveButton;