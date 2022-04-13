import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDirectoryModalActivation } from '../../store/modules/modals/modal.actions';
import Modal from '../../components/modals/modal';
import { StoreState } from '../../store/types';
import styles from './user.module.scss';
import { createNewFolder } from '../../store/modules/recipes/recipes.actions';
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
    console.log(inp);
    dispatch(createNewFolder(inp));
  };

  const directories = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  return (
    <div>
      <button type="button" onClick={handleClick} className={styles.but}>
        sent
      </button>
      {
        <form onSubmit={handleSubmit}>
          <input type="text" value={inp} name="createDir" onChange={handleChange} />
          <button type="submit" onSubmit={handleSubmit}>
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
      <div>
        Список покупок
        {shoppingList.map((el) => (
          <p>{el}</p>
        ))}
      </div>
    </div>
  );
};
export default User;
