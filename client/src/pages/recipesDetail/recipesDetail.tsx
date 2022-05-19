import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import {
  dataAboutRecipes,
  deleteFromShoppingList,
  getDataAboutFavouriteRecipes,
  saveToShoppingList,
} from '../../store/modules/recipes/recipes.actions';
import styles from './recipesDetail.module.scss';
import SaveButton from '../../UI/saveButton/saveButton';
import EnergyBlock from '../../components/energyBlock/energyBlock';
import { RecipeTypes } from '../../store/types/recipes.types';
import { deletePositionFromShoppingList, savePositionToShoppingList } from '../../api/actionsOverShoppingList';

type RecipesDetailTypes = {
  detailId: number;
};

const RecipesDetail: React.FunctionComponent = () => {
  const params = useParams();
  const { detailId } = params as RecipesDetailTypes;
  const recipes = useSelector((state: StoreState) => getRecipes(state));
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [activeSuccessMessage, setActiveSuccessMessage] = useState(false);
  const [timer, setTimer] = useState<any>(null);
  const [findElem, setFindElem] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [disable, setDisable] = useState<boolean>(false);
  const [saveTitleState, setSaveTitleState] = useState<string>('Сохранить в избранное');
  useEffect(() => {
    dispatch(dataAboutRecipes());
    dispatch(getDataAboutFavouriteRecipes('basic'));
    window.scrollTo(0, 0);
  }, []);
  const findRecipeDetails: RecipeTypes | undefined = recipes.find((el) => {
    if (el._id) {
      return el._id === detailId;
    }
    if (el.id) {
      return el.id === Number(detailId);
    }
  });

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
    if (amount < 1) {
      setDisable((prevState) => !prevState);
      alert('Значение не может быть меньше 1');
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
      savePositionToShoppingList(value).catch((e) => console.log(e));
      setActiveSuccessMessage(true);
      const activeLineForSuccessMessage = setInterval(() => {
        setWidth((prevState) => (prevState !== 100 ? prevState + 5 : 100));
      }, 40);
      setTimer(activeLineForSuccessMessage);
    }
    if (!checked) {
      dispatch(deleteFromShoppingList(value));
      deletePositionFromShoppingList(value).catch((e) => console.log(e));
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
  const targetElement = useRef(findRecipeDetails);
  const objForSaveButton = {
    foundElem: findElem,
    setFoundElem: setFindElem,
    style: {
      top: '-4px',
      right: '-25px',
      width: '20px',
      height: '20px',
    },
    saveStatus: setSaveTitleState,
    targetElem: targetElement,
  };

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
              ВРЕМЯ ПРИГОТОВЛЕНИЯ &nbsp;&nbsp;
              {findRecipeDetails.time}
              {findRecipeDetails.time && findRecipeDetails.time < 60 ? 'МИН' : 'Ч'}
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
              {findRecipeDetails.ingredients?.map((el, i: number) => (
                <label key={i} className={styles.element}>
                  <input
                    type="checkbox"
                    onChange={changeFunc}
                    value={el.product.product + ' - ' + el.count * amount + el.measure.measure}
                    name={el.product.product}
                  />
                  {el.product.product}
                  <span className={styles.measure}>{el.count * amount + ' ' + el.measure.measure}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <EnergyBlock findRecipe={findRecipeDetails} />
        <div className={styles.instruction}>
          <div className={styles.instructionTitle}>ИНСТРУКЦИЯ ПРИГОТОВЛЕНИЯ</div>
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={findRecipeDetails.video}
            className={styles.video}
          />
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
