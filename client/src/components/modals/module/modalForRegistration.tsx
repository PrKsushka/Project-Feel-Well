import React, { useState } from 'react';
import Modal from '../modal';
import { registration } from '../../../api/user/user';
import { userRegistered, userUnregistered } from '../../../store/modules/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../store/types';
import { registrationModalActivation } from '../../../store/modules/modals/modal.actions';

const ModalForRegistration: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const submitForm = async (e: any) => {
    e.preventDefault();
    await registration(inputs.email, inputs.password, inputs.firstName, inputs.lastName)
      .then((res) => {
        dispatch(userRegistered());
        dispatch(registrationModalActivation(false));
      })
      .catch((err: any) => {
        dispatch(userUnregistered(err.response.data.message));
      });
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    setInputs((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };
  const registrationModal = useSelector((state: StoreState) => state.modal.registrationModal);
  return (
    <Modal isActive={registrationModal}>
      <form onSubmit={submitForm}>
        <input type="email" name="email" onChange={handleChange} value={inputs.email} />
        <input type="password" name="password" onChange={handleChange} value={inputs.password} />
        <input type="text" name="firstName" onChange={handleChange} value={inputs.firstName} />
        <input type="text" name="lastName" onChange={handleChange} value={inputs.lastName} />
        <button type="submit">Отправить</button>
      </form>
    </Modal>
  );
};
export default ModalForRegistration;
