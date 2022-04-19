import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDirectoryModalActivation } from '../../store/modules/modals/modal.actions';
import { StoreState } from '../../store/types';
import styles from './user.module.scss';
import { createNewFolder, deleteFromShoppingList } from '../../store/modules/recipes/recipes.actions';
import { getShoppingList } from '../../store/modules/recipes/recipes.selectors';
import { Link } from 'react-router-dom';
import links from '../../constants/links';

const User: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(createDirectoryModalActivation(true));
  };
  const shoppingList = useSelector((state: StoreState) => getShoppingList(state));
  const [inp, setInp] = useState('');
  const handleChange = (e: any) => {
    setInp((prevState) => e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createNewFolder(inp));
  };

  const directories = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  const dataAboutUser = useSelector((state: StoreState) => state.user.dataAboutUser);
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
  return (
    <div className={styles.wrapper}>
      <div className={styles.firstBlockWrapper}>
        <div className={styles.personalInformation}>
          <div>
            Hello,
            {dataAboutUser.firstName}
            {dataAboutUser.lastName}
          </div>
        </div>
        <div className={styles.shoppingList}>
          Список покупок
          {shoppingList.map((el) => (
            <label>
              <input type='checkbox' onChange={changeFunc} checked={isChecked(el)} value={el} />
              {el}
            </label>

          ))}
        </div>
      </div>

      {
        <form onSubmit={handleSubmit}>
          <input type='text' value={inp} name='createDir' onChange={handleChange} />
          <button type='submit' onSubmit={handleSubmit}>
            sent
          </button>
        </form>
      }
      <div className={styles.directoryWrapper}>
        {directories.map((el, i) => (
          <Link to={`${links.user}/${el[0]}`}>
            <div className={styles.directory} key={i} onClick={handleClick}>
              {el[0]}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default User;
