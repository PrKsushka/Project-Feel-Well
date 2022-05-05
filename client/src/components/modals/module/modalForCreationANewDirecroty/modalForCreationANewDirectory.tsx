import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../modal';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../store/types';
import { createNewFolder } from '../../../../store/modules/recipes/recipes.actions';
import { ChromePicker, SketchPicker } from 'react-color';
import { HexColorPicker } from 'react-colorful';
import styles from './modalForCreationANewDirectory.module.scss';

const ModalForCreationANewDirectory: React.FunctionComponent = () => {
  const openModel = useSelector((state: StoreState) => state.modal.createDirectoryModal);
  const dispatch = useDispatch();
  const [directoryName, setDirectoryName] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    const deleteMessage = setTimeout(() => {
      setMessage('');
    }, 3000);
    return () => clearTimeout(deleteMessage);
  }, [message]);
  const handleChange = (e: any) => {
    setDirectoryName((prevState) => e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (directoryName && currentColor) {
      dispatch(createNewFolder({ dirName: directoryName, color: currentColor }));
      setMessage('Папка успешно создана');
    } else {
      setMessage('Введите значения');
    }
  };
  return (
    <Modal isActive={openModel}>
      {message ? <div className={styles.message}>{message}</div> : null}
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <label>
          <span>Введите название папки</span>
          <input type="text" value={directoryName} name="createDir" onChange={handleChange} />
        </label>
        <div className={styles.colorPicker}>
          <p>Выберите цвет папки</p>
          <HexColorPicker onChange={setCurrentColor} color={currentColor} />
        </div>
        <button type="submit" onSubmit={handleSubmit} className="button">
          Отправить
        </button>
      </form>
    </Modal>
  );
};
export default ModalForCreationANewDirectory;
