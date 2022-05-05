import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDataAboutUserModalActivation, changePasswordModalActivation,
  createDirectoryModalActivation
} from '../../store/modules/modals/modal.actions';
import { StoreState } from '../../store/types';
import styles from './user.module.scss';
import { Link, useHistory } from 'react-router-dom';
import links from '../../constants/links';
import { getDataAboutUser } from '../../store/modules/user/user.actions';
import ShoppingList from '../../components/shoppingList/shoppingList';
import ModalForCreationANewDirectory
  from '../../components/modals/module/modalForCreationANewDirecroty/modalForCreationANewDirectory';
import CircleButton from '../../UI/circleButton/circleButton';
import ModalForChangingDataAboutUser
  from '../../components/modals/module/changeInfoAboutUser/modalForChangingDataAboutUser';
import ModalForChangingPassword from '../../components/modals/module/changeInfoAboutUser/modalForChangingPassword';

const User: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (history.action === 'POP') {
      dispatch(createDirectoryModalActivation(false));
    }
    dispatch(getDataAboutUser());
  }, []);

  const directories = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  const dataAboutUser = useSelector((state: StoreState) => state.user.dataAboutUser);
  const color: string[] = useSelector((state: StoreState) => state.recipes.folderColor);

  const isActiveModalForChangingDataAboutUser = useSelector((state: StoreState) => state.modal.changeDataAboutUserModal);
  const isActiveModalForCreationNewDir = useSelector((state: StoreState) => state.modal.createDirectoryModal);
  const isActiveModalForChangingPassword = useSelector((state: StoreState) => state.modal.changePasswordModal);

  const openModalForCreationDirectory = () => {
    dispatch(createDirectoryModalActivation(true));
  };
  const openChangeDataAboutUserModal = () => {
    dispatch(changeDataAboutUserModalActivation(true));
  };
  const openChangePasswordModal = () => {
    dispatch(changePasswordModalActivation(true));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.firstBlockWrapper}>
        <div className={styles.personalInformation}>
          {/*<div className={styles.circle}></div>*/}
          <div
            className={styles.info}>
            <p>Привет, {`${dataAboutUser.firstName}  ${dataAboutUser.lastName}`}</p>
            <p>{dataAboutUser.email}</p>
          </div>
          <button type='button' onClick={openChangeDataAboutUserModal} className='button'>
            Изменить данные
          </button>
          <button type='button' onClick={openChangePasswordModal} className='button'>
            Изменить пароль
          </button>
        </div>
        <div className={styles.shoppingList}>
          <div className={styles.text}>
            <p className={styles.shoppingListTitle}>Список покупок</p>
            <span>Нажми на квадратик, если купил продукт</span>
          </div>
          <ShoppingList />
        </div>
      </div>
      <div className={styles.directoryWrapper}>
        <div className={styles.directoryTitle}>
          <p>Избранное</p>
          <CircleButton clickFunc={() => openModalForCreationDirectory} />
        </div>
        {directories.map((el, i) => (
          <Link to={`${links.user}/${el[0]}`}>
            <div className={styles.directory} key={i} style={{ background: color[i] }}>
              {el[0]}
            </div>
          </Link>
        ))}
      </div>
      {isActiveModalForCreationNewDir ? <ModalForCreationANewDirectory /> : null}
      {isActiveModalForChangingDataAboutUser ? <ModalForChangingDataAboutUser /> : null}
      {isActiveModalForChangingPassword ? <ModalForChangingPassword /> : null}
    </div>
  );
};
export default User;
