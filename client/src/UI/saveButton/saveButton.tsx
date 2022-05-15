import React, { useEffect, useRef, useState } from 'react';
import { PlaceElement, StoreState } from '../../store/types/types';
import { getFavouriteRecipes, unsavedFromFavouriteRecipes } from '../../store/modules/recipes/recipes.actions';
import { useDispatch, useSelector } from 'react-redux';
import { openPopUp } from '../../store/modules/modals/modal.actions';
import { RecipeTypes } from '../../store/types/recipes.types';
import Store from '../../store/store';

type Obj = {
  foundElem: boolean;
  setFoundElem: any;
  style: {
    top: string;
    right: string;
  };
  targetElem: any;
  saveStatus: any;
};

interface SaveButtonTypes {
  el: RecipeTypes | PlaceElement;
  targetElem?: any;
  obj?: Obj;
  children?: React.ReactNode;
}

const SaveButton: React.FunctionComponent<SaveButtonTypes> = ({ el, targetElem, obj }) => {
  const dispatch = useDispatch();
  const favRecipes = useSelector((state: StoreState) => state.recipes.favouriteRecipes)[0];
  const favouriteRec = useSelector((state: StoreState) => state.recipes.favouriteRecipesWithDB);
  const currentElem = useRef(null);
  const [elem, setElem] = useState(false);
  useEffect(() => {
    // if (favRecipes[1]) {
    //   favRecipes[1].find((elem: RecipeTypes) => {
    //     if (obj && el._id === elem._id) {
    //       obj.setFoundElem(true);
    //     }
    //     if (el._id === elem._id) {
    //       setElem(true);
    //     }
    //   });
    // }
    if (favouriteRec) {
      favouriteRec.find((elem: RecipeTypes) => {
        if ((obj && elem.id === obj.targetElem.current.id) || (elem._id !== undefined && obj && elem._id === obj.targetElem.current._id)) {
          obj.setFoundElem(true);
        }
        if (elem.id === el.id) {
          setElem(true);
        }
      });
    }
  }, []);

  const handleClick = (elem: RecipeTypes) => (e: any) => {
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
  return (
    <div style={obj ? obj.style : undefined} ref={currentElem} className={(obj && obj.foundElem) || elem ? 'saveClicked' : 'save'} onClick={handleClick(el)} />
  );
};
export default SaveButton;
