import React, { useState } from 'react';
import Modal from '../modal';
import { authentication } from '../../../api/user/user';
import { userAuthenticated, userUnauthenticated } from '../../../store/modules/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../store/types';
import { loginModalActivation } from '../../../store/modules/modals/modal.actions';

const ModalForLogin: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const submitForm = async (e: any) => {
    e.preventDefault();
    await authentication(inputs.email, inputs.password)
      .then((res) => {
        dispatch(userAuthenticated());
        dispatch(loginModalActivation(false));
      })
      .catch((err: any) => {
        dispatch(userUnauthenticated(err.response.data.message));
      });
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    setInputs((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };
  const loginModal = useSelector((state: StoreState) => state.modal.loginModal);
  return (
    <Modal isActive={loginModal}>
      <form onSubmit={submitForm}>
        <input type="email" name="email" onChange={handleChange} value={inputs.email} />
        <input type="password" name="password" onChange={handleChange} value={inputs.password} />
        <button type="submit">Отправить</button>
      </form>
    </Modal>
  );
};
export default ModalForLogin;
