import React, { useState } from 'react';
import Modal from '../modal';
import { registration } from '../../../api/user/user';
import { userRegistered, userUnregistered } from '../../../store/modules/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../store/types';
import { registrationModalActivation } from '../../../store/modules/modals/modal.actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaForRegistration } from '../../../schemas/schemaForRegistration';
import styles from './forms.module.scss';

const ModalForRegistration: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForRegistration),
    mode: 'onChange',
  });
  const body = document.getElementsByTagName('body')[0];
  const submitForm = async (data: any) => {
    await registration(data.email, data.password, data.firstName, data.lastName)
      .then((res) => {
        dispatch(userRegistered(data.firstName, data.lastName));
        dispatch(registrationModalActivation(false));
      })
      .catch((err: any) => {
        dispatch(userUnregistered(err.response.data.message));
      });
    body.style.overflowY = 'auto';
  };

  const registrationModal = useSelector((state: StoreState) => state.modal.registrationModal);
  return (
    <Modal isActive={registrationModal}>
      <form onSubmit={handleSubmit(submitForm)} className={styles.formWrapper}>
        <div className={styles.error}>{errors.email?.message}</div>
        <input type="email" {...register('email')} placeholder={'Введите email'} />
        <div className={styles.error}>{errors.password?.message}</div>
        <input type="password" {...register('password')} placeholder={'Введите password'} />
        <div className={styles.error}>{errors.passwordConfirmation?.message}</div>
        <input type="password" {...register('passwordConfirmation')} placeholder={'Введите пароль еще раз'} />
        <div className={styles.error}>{errors.firstName?.message}</div>
        <input type="text" {...register('firstName')} placeholder={'Введите имя'} />
        <div className={styles.error}>{errors.lastName?.message}</div>
        <input type="text" {...register('lastName')} placeholder={'Введите фамилию'} />
        <button type="submit" className={styles.buttonSubmit}>
          Отправить
        </button>
      </form>
    </Modal>
  );
};
export default ModalForRegistration;
