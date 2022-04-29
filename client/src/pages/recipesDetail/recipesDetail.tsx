import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductElement, StoreState } from '../../store/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import { deleteFromShoppingList, saveToShoppingList } from '../../store/modules/recipes/recipes.actions';
import styles from './recipesDetail.module.scss';
import SaveButton from '../../UI/saveButton/saveButton';
import EnergyBlock from '../../components/energyBlock/energyBlock';

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
  const [findElem, setFindElem] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [disable, setDisable] = useState<boolean>(false);
  const [saveTitleState, setSaveTitleState] = useState<string>('Сохранить в избранное');
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

  useEffect(() => {
    if (amount <= 0) {
      setDisable((prevState) => !prevState);
      alert('Value can not be less than one');
    } else {
      setDisable(false);
    }

    if (findElem) {
      setSaveTitleState('Сохранено в избранное');
    }
  }, [findElem, amount]);

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
  };
  const increaseAmount = () => {
    setAmount((prevState) => prevState + 1);
  };
  const decreaseAmount = () => {
    setAmount((prevState) => prevState - 1);
  };
  const targetElement = useRef();
  const objForSaveButton = {
    foundElem: findElem,
    setFoundElem: setFindElem,
    style: {
      top: '-9px',
      right: '-30px',
    },
    saveStatus: setSaveTitleState,
    targetElem: targetElement,
  };
  console.log(findRecipeDetails);
  if (findRecipeDetails) {
    return (
      <div className={styles.details}>
        <div
          className={styles.image}
          style={{
            background: `url(${require(`../../${findRecipeDetails.image}`)}) no-repeat center`,
            backgroundSize: 'cover',
          }}
        ></div>
        <div className={styles.recipe}>
          <div className={styles.title}>{findRecipeDetails.name}</div>
          <div className={styles.elems}>
            <div className={styles.findRecipeTime}>
              ВРЕМЯ ПРИГОТОВЛЕНИЯ {findRecipeDetails.time}
              {findRecipeDetails.time < 60 ? 'МИН' : 'Ч'}
            </div>
            <div className={styles.findRecipeSave}>
              {saveTitleState}
              <SaveButton el={findRecipeDetails} obj={objForSaveButton} />
            </div>
          </div>
          <div className={styles.recipeTitle}>{findRecipeDetails.title}</div>
          <div className={styles.ingredientsWrapper}>
            <div className={styles.ingredientsTitle}>
              <div className={styles.name}>ингредиенты</div>
              <div className={styles.amount}>
                порции
                <button type="button" className={styles.plusMinus} onClick={decreaseAmount} disabled={disable}>
                  <div className={styles.horizontal}></div>
                </button>
                <div className={styles.count}>{amount}</div>
                <button type="button" className={styles.plusMinus} onClick={increaseAmount}>
                  <div className={styles.horizontal}></div>
                  <div className={styles.vertical}></div>
                </button>
              </div>
            </div>
            <div className={styles.ingredients}>
              {findRecipeDetails.ingredients?.map((el, i) => (
                <label key={i} className={styles.element}>
                  <input type="checkbox" onChange={changeFunc} value={el} name={el} />
                  {el}
                </label>
              ))}
            </div>
          </div>
        </div>
        <EnergyBlock findRecipe={findRecipeDetails} />
        <div className={styles.instruction}>
          <div className={styles.instructionTitle}>ИНСТРУКЦИЯ ПРИГОТОВЛЕНИЯ</div>
          <div className={styles.video}></div>
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
