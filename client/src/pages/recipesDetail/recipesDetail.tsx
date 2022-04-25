import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductElement, StoreState } from '../../store/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import { deleteFromShoppingList, saveToShoppingList } from '../../store/modules/recipes/recipes.actions';
import styles from './recipesDetail.module.scss';
import SaveButton from '../../UI/saveButton/saveButton';

type RecipesDetailTypes = {
  detailId: number;
};

const RecipesDetail: React.FunctionComponent = () => {
  const params = useParams();
  const { detailId } = params as RecipesDetailTypes;
  const recipes = useSelector((state: StoreState) => getRecipes(state));
  const findRecipeDetails: ProductElement | undefined = recipes.find((el) => {
    return el._id === detailId;
  });
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [activeSuccessMessage, setActiveSuccessMessage] = useState(false);
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    let timeoutForActiveSuccessMessage: NodeJS.Timeout;
    if (activeSuccessMessage) {
      timeoutForActiveSuccessMessage = setTimeout(() => {
        setActiveSuccessMessage(false);
        clearInterval(timer);
        setWidth(0);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutForActiveSuccessMessage);
      clearInterval(timer);
    };
  }, [activeSuccessMessage]);

  const changeFunc = (e: React.SyntheticEvent) => {
    const { value, checked } = e.target as HTMLInputElement;
    if (checked && value !== ' ') {
      dispatch(saveToShoppingList(value));
      setActiveSuccessMessage(true);
      const activeLineForSuccessMessage = setInterval(() => {
        setWidth((prevState) => (prevState !== 100 ? prevState + 5 : 100));
      }, 40);
      setTimer(activeLineForSuccessMessage);
    }
    if (!checked) {
      dispatch(deleteFromShoppingList(value));
      setActiveSuccessMessage(false);
    }
    return timer;
  }

  if (findRecipeDetails) {
    return (
      <div className={styles.details}>
        <div
          className={styles.image}
          style={{ background: `url(${require(`../../${findRecipeDetails.image}`)}) no-repeat center`, backgroundSize: 'cover' }}
        ></div>
        <div className={styles.recipe}>
          <div className={styles.title}>{findRecipeDetails.name}</div>
          <SaveButton el={findRecipeDetails} />
          <div>
            {findRecipeDetails.ingredients?.map((el, i) => (
              <div key={i}>
                <label className={styles.ingredients}>
                  {el}
                  <input type="checkbox" onChange={changeFunc} value={el} name={el} />
                </label>
              </div>
            ))}
          </div>
        </div>

        {activeSuccessMessage ? (
          <div className={styles.message}>
            <p className={styles.textForMessage}>Добавлено в список покупок</p>
            <div className={styles.line} style={{ width: `${width}%` }} />
          </div>
        ) : null}
      </div>
    );
  }
  return <div>Not found</div>;
};
export default RecipesDetail;
