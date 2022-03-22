import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { ReactNode } from 'react';
import styles from './modal.module.scss';
import { createDirectoryModalActivation, loginModalActivation, registrationModalActivation } from '../../store/modules/modals/modal.actions';
import { StoreState } from '../../store/types';
import { userUnauthenticated, userUnregistered } from '../../store/modules/user/user.actions';
import { useHistory } from 'react-router-dom';

interface ModalTypes {
  isActive: boolean;
  children?: ReactNode;
}

const Modal: React.FunctionComponent<ModalTypes> = ({ isActive, children }) => {
  const portal: any = document.getElementById('portal');
  const body = document.getElementsByTagName('body')[0];
  const dispatch = useDispatch();
  const cancelModal = () => {
    dispatch(loginModalActivation(false));
    dispatch(registrationModalActivation(false));
    dispatch(createDirectoryModalActivation(false));
    dispatch(userUnregistered(''));
    dispatch(userUnauthenticated(''));
    body.style.overflowY = 'auto';
    window.history.replaceState(null, '', '/');
  };
  const failedAuth = useSelector((state: StoreState) => state.user.failedAuth);
  if (isActive) {
    body.style.overflowY = 'hidden';
    return ReactDOM.createPortal(
      <div className={styles.modalWrapper}>
        <div className={styles.iconCancel} onClick={cancelModal} />
        {failedAuth !== '' ? <div className={styles.failedAuth}>{failedAuth}</div> : null}
        <div className={styles.modalContent}>{children}</div>
      </div>,
      portal
    );
  } else {
    return null;
  }
};
export default Modal;