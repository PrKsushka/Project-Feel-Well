import React, { useEffect, useState } from 'react';
import { ProductElement, StoreState } from '../../store/types';
import { getFavouriteRecipes, unsavedFromFavouriteRecipes } from '../../store/modules/recipes/recipes.actions';
import { useDispatch, useSelector } from 'react-redux';
import { openPopUp } from '../../store/modules/modals/modal.actions';
interface SaveButtonTypes {
  el: ProductElement;
  targetElem?: any;
  children?: React.ReactNode;
}
const SaveButton: React.FunctionComponent<SaveButtonTypes> = ({ el, targetElem }) => {
  const dispatch = useDispatch();
  const [findElem, setFindElem] = useState(false);
  const favRecipes = useSelector((state: StoreState) => state.recipes.favouriteRecipes)[0];

  useEffect(() => {
    if (favRecipes[1]) {
      favRecipes[1].find((elem: ProductElement) => {
        if (el._id === elem._id) {
          setFindElem(true);
        }
      });
    }
  }, []);

  const handleClick = (elem: ProductElement) => (e: any) => {
    if (e.target.className === 'saveClicked') {
      e.target.className = 'save';
      dispatch(openPopUp(false));
      return dispatch(unsavedFromFavouriteRecipes(elem));
    }
    e.target.className = 'saveClicked';
    dispatch(openPopUp(true));
    targetElem.current = elem;
    dispatch(getFavouriteRecipes(elem));
  };
  return <div className={findElem ? 'saveClicked' : 'save'} onClick={handleClick(el)} />;
};
export default SaveButton;
