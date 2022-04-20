import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDirectoryModalActivation } from '../../store/modules/modals/modal.actions';
import { StoreState } from '../../store/types';
import styles from './user.module.scss';
import { Link } from 'react-router-dom';
import links from '../../constants/links';
import { getDataAboutUser } from '../../store/modules/user/user.actions';
import ShoppingList from '../../components/shoppingList/shoppingList';
import ModalForCreationANewDirectory from '../../components/modals/module/modalForCreationANewDirectory';

const User: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataAboutUser());
  }, []);
  const handleClick = () => {
    dispatch(createDirectoryModalActivation(true));
  };
  const directories = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  const dataAboutUser = useSelector((state: StoreState) => state.user.dataAboutUser);
  const openModalForCreationDirectory = () => {
    dispatch(createDirectoryModalActivation(true));
  };
  const modalActive = useSelector((state: StoreState) => state.modal.createDirectoryModal);
  const colors: Array<string> = ['#ffb5e8', '#ff9cee', '#ffcff9', '#c5a3ff', '#d5aaff', '#afcbff', '#aff8d8', '#ffffd1'];
  return (
    <div className={styles.wrapper}>
      <div className={styles.firstBlockWrapper}>
        <div className={styles.personalInformation}>
          <div className={styles.circle}></div>
          <div className={styles.info}>
            {`${dataAboutUser.firstName}  ${dataAboutUser.lastName} ${dataAboutUser.email}`}
          </div>
        </div>
        <div className={styles.shoppingList}>
          <p className={styles.shoppingListTitle}>Список покупок</p>
          <ShoppingList />
        </div>
      </div>
      <div className={styles.directoryWrapper}>
        <div className={styles.directoryTitle}>
          <p>Избранное</p>
          <button onClick={openModalForCreationDirectory} className={styles.openDir}>
            <div className={styles.lineWrapper}>
              <div className={styles.horizontal}></div>
              <div className={styles.vertical}></div>
            </div>
          </button>
        </div>
        {directories.map((el, i) => (
          <Link to={`${links.user}/${el[0]}`}>
            <div className={styles.directory} key={i} onClick={handleClick} style={{ background: `${colors[i]}` }}>
              {el[0]}
            </div>
          </Link>
        ))}
      </div>
      {modalActive ? <ModalForCreationANewDirectory /> : null}
    </div>
  );
};
export default User;
