import React, { useState } from 'react';
import Modal from '../../modal';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store/types';
import styles from '../forms.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaForChangingDataAboutUser } from '../../../../schemas/schemaForChangingDataAboutUser';
import { changeDataAboutUser } from '../../../../api/user/changeData';

const ModalForChangingDataAboutUser: React.FunctionComponent = () => {
  const isActiveModal = useSelector((state: StoreState) => state.modal.changeDataAboutUserModal);
  const dataAboutUser = useSelector((state: StoreState) => state.user.dataAboutUser);
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForChangingDataAboutUser),
    mode: 'onChange',
  });
  const sentData = async (data: any) => {
    setSuccessMessage('Данные успешно изменены');
    await changeDataAboutUser(data.firstName, data.lastName);
  };
  return (
    <Modal isActive={isActiveModal}>
      {successMessage ? <div className={styles.message}>{successMessage}</div> : null}
      <form onSubmit={handleSubmit(sentData)} className={styles.formWrapper}>
        <label>
          <span>Изменить имя:</span>
          <input type="text" {...register('firstName')} defaultValue={dataAboutUser.firstName} />
        </label>
        <div className={styles.error}>{errors.firstName?.message}</div>
        <label>
          <span>Изменить фамилию:</span>
          <input type="text" {...register('lastName')} defaultValue={dataAboutUser.lastName} />
        </label>
        <div className={styles.error}>{errors.lastName?.message}</div>

        <button type="submit" className="button">
          Отправить
        </button>
      </form>
    </Modal>
  );
};
export default ModalForChangingDataAboutUser;
