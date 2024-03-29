import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDataAboutUserModalActivation,
  changePasswordModalActivation,
  createDirectoryModalActivation,
} from '../../store/modules/modals/modal.actions';
import { StoreState } from '../../store/types/types';
import styles from './user.module.scss';
import { Link, useHistory } from 'react-router-dom';
import links from '../../constants/links';
import { getDataAboutUser } from '../../store/modules/user/user.actions';
import ShoppingList from '../../components/shoppingList/shoppingList';
import ModalForCreationANewDirectory from '../../components/modals/module/modalForCreationANewDirecroty/modalForCreationANewDirectory';
import CircleButton from '../../UI/circleButton/circleButton';
import ModalForChangingDataAboutUser from '../../components/modals/module/changeInfoAboutUser/modalForChangingDataAboutUser';
import ModalForChangingPassword from '../../components/modals/module/changeInfoAboutUser/modalForChangingPassword';
import { getDataAboutFolders, getDataAboutShoppingList } from '../../store/modules/recipes/recipes.actions';
import { getShoppingList } from '../../store/modules/recipes/recipes.selectors';
import { strictEqual } from 'assert';

const User: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dataAboutUser = useSelector((state: StoreState) => state.user.dataAboutUser);
  const color: string[] = useSelector((state: StoreState) => state.recipes.folderColor);
  const folders = useSelector((state: StoreState) => state.recipes.folders);

  const isActiveModalForChangingDataAboutUser = useSelector((state: StoreState) => state.modal.changeDataAboutUserModal);
  const isActiveModalForCreationNewDir = useSelector((state: StoreState) => state.modal.createDirectoryModal);
  const isActiveModalForChangingPassword = useSelector((state: StoreState) => state.modal.changePasswordModal);
  const successMessage = useSelector((state: StoreState) => state.recipes.successMessage);
  useEffect(() => {
    if (history.action === 'POP') {
      dispatch(createDirectoryModalActivation(false));
    }
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getDataAboutFolders());
  }, [successMessage]);

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
          <div className={styles.info}>
            <p>Привет, {`${dataAboutUser.firstName}  ${dataAboutUser.lastName}`}</p>
            <p>{dataAboutUser.email}</p>
          </div>
          <button type="button" onClick={openChangeDataAboutUserModal} className="button">
            Изменить данные
          </button>
          <button type="button" onClick={openChangePasswordModal} className="button">
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
        {folders.map((el, i) => (
          <Link to={`${links.user}/${el}`} key={i}>
            <div className={styles.directory} style={{ background: color[i] }}>
              {el}
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
