import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import { stat } from 'fs';
import React, { ReactNode } from 'react';
interface ModalTypes {
  isActive: boolean;
  children?: ReactNode;
}
const Modal: React.FunctionComponent<ModalTypes> = ({ isActive, children }) => {
  const portal: any = document.getElementById('portal');
  //const auth = useSelector((state: StoreState) => state.user.auth);
  if (isActive) {
    return ReactDOM.createPortal(
      <div>
        <div>{children}</div>
      </div>,
      portal
    );
  } else {
    return null;
  }
};
export default Modal;
