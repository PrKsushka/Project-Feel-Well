import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDirectoryModalActivation } from '../../store/modules/modals/modal.actions';
import Modal from '../../components/modals/modal';
import { StoreState } from '../../store/types';
import styles from './user.module.scss';
import { createNewFolder } from '../../store/modules/recipes/recipes.actions';

const User: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(createDirectoryModalActivation(true));
  };
  const activeModal = useSelector((state: StoreState) => state.modal.createDirectoryModal);
  const [inp, setInp] = useState('');
  const handleChange = (e: any) => {
    setInp((prevState) => e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(inp);
    dispatch(createNewFolder(inp));
  };
  return (
    <div>
      <button type="button" onClick={handleClick} className={styles.but}>
        sent
      </button>
      {
        <Modal isActive={activeModal}>
          <form onSubmit={handleSubmit}>
            <input type="text" value={inp} name="createDir" onChange={handleChange} />
            <button type="submit" onSubmit={handleSubmit}>
              sent
            </button>
          </form>
        </Modal>
      }
    </div>
  );
};
export default User;
