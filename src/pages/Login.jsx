import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
    navigate('/posts', { replace: true });
  };

  return (
    <div className="login-wrapper">
      <div>
        <h4>Страница для логина</h4>
        <form onSubmit={login}>
          <MyInput type="text" placeholder="Введите логин" />
          <MyInput type="password" placeholder="Введите пароль" />
          <MyButton style={{ margin: '15px auto', display: 'block' }}>Войти</MyButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
