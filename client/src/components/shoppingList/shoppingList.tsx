import styles from '../../pages/user/user.module.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import { getShoppingList } from '../../store/modules/recipes/recipes.selectors';
import { deleteFromShoppingList } from '../../store/modules/recipes/recipes.actions';

const ShoppingList: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const shoppingList = useSelector((state: StoreState) => getShoppingList(state));
  const [checkedVal, setCheckedVal] = useState('');
  const changeFunc = (e: any) => {
    setCheckedVal(e.target.value);
    dispatch(deleteFromShoppingList(e.target.value));
  };
  const isChecked = (el: any) => {
    if (el === checkedVal) {
      return true;
    }
    return false;
  };
  console.log(shoppingList)
  if (shoppingList.length !== 0) {
    return (
      <div className={styles.list}>
        {shoppingList.map((el, i) => (
          <label className={styles.ingredients} key={i}>
            <input type="checkbox" onChange={changeFunc} checked={isChecked(el)} value={el} />
            {el}
          </label>
        ))}
      </div>
    );
  } else {
    return <div className={styles.emptyList}>Список покупок пуст</div>;
  }
};
export default ShoppingList;
