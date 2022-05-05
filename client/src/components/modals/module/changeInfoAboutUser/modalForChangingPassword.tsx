import React, { useState } from 'react';
import Modal from '../../modal';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store/types';
import styles from '../forms.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePassword } from '../../../../api/user/changeData';
import { schemaForChangingPassword } from '../../../../schemas/schemaForChangingPassword';

const ModalForChangingPassword: React.FunctionComponent = () => {
  const isActiveModal = useSelector((state: StoreState) => state.modal.changePasswordModal);
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForChangingPassword),
    mode: 'onChange',
  });
  const sentData = async (data: any) => {
    setSuccessMessage('Данные успешно изменены');
    await changePassword(data.password, data.newPassword).catch((err) => {
      console.log(err);
    });
  };
  return (
    <Modal isActive={isActiveModal}>
      {successMessage ? <div className={styles.message}>{successMessage}</div> : null}
      <form onSubmit={handleSubmit(sentData)} className={styles.formWrapper}>
        <label>
          <input type="text" {...register('password')} placeholder="Введите текуший пароль" />
        </label>
        <div className={styles.error}>{errors.password?.message}</div>
        <label>
          <input type="text" {...register('newPassword')} placeholder="Введите новый пароль" />
        </label>
        <div className={styles.error}>{errors.newPassword?.message}</div>

        <button type="submit" className="button">
          Отправить
        </button>
      </form>
    </Modal>
  );
};
export default ModalForChangingPassword;
