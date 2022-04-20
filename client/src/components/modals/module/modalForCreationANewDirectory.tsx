import React, { useState } from 'react';
import Modal from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../store/types';
import { createNewFolder } from '../../../store/modules/recipes/recipes.actions';

const ModalForCreationANewDirectory: React.FunctionComponent = () => {
  const openModel = useSelector((state: StoreState) => state.modal.createDirectoryModal);
  const dispatch = useDispatch();
  const [directoryName, setDirectoryName] = useState('');
  const handleChange = (e: any) => {
    setDirectoryName((prevState) => e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createNewFolder(directoryName));
  };
  return (
    <Modal isActive={openModel}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={directoryName} name="createDir" onChange={handleChange} />
        <button type="submit" onSubmit={handleSubmit}>
          sent
        </button>
      </form>
    </Modal>
  );
};
export default ModalForCreationANewDirectory;
