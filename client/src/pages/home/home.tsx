import React from 'react';
import { useDispatch } from 'react-redux';
import { authentication, registration } from '../../api/user/user';
import { userAuthenticated } from '../../store/modules/user/user.actions';

const Home: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const obj = {
    firstName: 'Dasha',
    lastName: 'Kyaro',
    email: 'dddd@gmail.com',
    password: '11111111',
  };
  const userRegistr = async (e: any) => {
    e.preventDefault();
    await registration(obj.email, obj.password, obj.firstName, obj.lastName);
  };
  const userAuth = async (e: any) => {
    e.preventDefault();
    await authentication(obj.email, obj.password).then((res) => {
      dispatch(userAuthenticated());
    });
  };
  return (
    <form onSubmit={userAuth}>
      <button style={{ padding: '10px', margin: '200px 0 0 0' }} type="submit">
        click
      </button>
    </form>
  );
};
export default Home;
