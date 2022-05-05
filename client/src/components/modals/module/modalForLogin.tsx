import React, { useState } from 'react';
import Modal from '../modal';
import { authentication } from '../../../api/user/user';
import { userAuthenticated, userUnauthenticated } from '../../../store/modules/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../store/types';
import { loginModalActivation } from '../../../store/modules/modals/modal.actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaForLoginForm } from '../../../schemas/schemaForLoginForm';
import styles from './forms.module.scss';

type LoginFormData = {
  email: string;
  password: string;
};
const ModalForLogin: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForLoginForm),
    mode: 'onChange',
  });
  const body = document.getElementsByTagName('body')[0];
  const submitForm = async (data: any | LoginFormData) => {
    await authentication(data.email, data.password)
      .then((res) => {
        dispatch(userAuthenticated());
        dispatch(loginModalActivation(false));
      })
      .catch((err: any) => {
        dispatch(userUnauthenticated(err.response.data.message));
      });
    body.style.overflowY = 'auto';
  };
  const loginModal = useSelector((state: StoreState) => state.modal.loginModal);
  return (
    <Modal isActive={loginModal}>
      <form onSubmit={handleSubmit(submitForm)} className={styles.formWrapper}>
        <div className={styles.error}>{errors.email?.message}</div>
        <input type="email" {...register('email')} placeholder={'Введите email'} />
        <div className={styles.error}>{errors.password?.message}</div>
        <input type="password" {...register('password')} placeholder={'Введите пароль'} />
        <button type="submit" className='button'>
          Отправить
        </button>
      </form>
    </Modal>
  );
};
export default ModalForLogin;
