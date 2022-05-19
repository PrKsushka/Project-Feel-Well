import styles from '../../pages/user/user.module.scss';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import { getShoppingList } from '../../store/modules/recipes/recipes.selectors';
import { deleteFromShoppingList, getDataAboutShoppingList } from '../../store/modules/recipes/recipes.actions';
import arr from '../../constants/sortRecipes';
import { set } from 'react-hook-form';

const ShoppingList: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const shoppingList = useSelector((state: StoreState) => getShoppingList(state));
  const [checkedVal, setCheckedVal] = useState<Array<string>>([]);
  const [param, setParam] = useState(true);
  const changeFunc = (e: any) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedVal((prevState) => [...prevState, e.target.value]);
    } else {
      setCheckedVal([]);
    }
  };
  const deleteItem = () => {
    const check = confirm('Вы уверенны что хотите удалить?');
    console.log(checkedVal);
    if (check) {
      if (checkedVal.length >= 1) {
        checkedVal.forEach((el) => {
          dispatch(deleteFromShoppingList(el));
          setParam(true);
        });
      }
    }
  };
  useEffect(() => {
    dispatch(getDataAboutShoppingList());
    setParam(false);
  }, [param]);

  if (shoppingList.length !== 0) {
    return (
      <div>
        <div className={styles.list}>
          {shoppingList.map((el, i) => (
            <label className={styles.ingredients} key={i}>
              <input type="checkbox" onChange={changeFunc} value={el} />
              {el}
            </label>
          ))}
        </div>
        <button type="button" onClick={deleteItem} className="button">
          Удалить
        </button>
      </div>
    );
  } else {
    return <div className={styles.emptyList}>Список покупок пуст</div>;
  }
};
export default ShoppingList;
