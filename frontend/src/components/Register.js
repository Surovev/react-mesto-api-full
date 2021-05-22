import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../utils/mestoAuth';
import Header from './Header';

function Register (props) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    const { password, email } = userData;
    e.preventDefault();
    props.onRegister({ password, email }).catch(message =>
      console.log(message)
    );
  };
  return (
    <>
      <Header>
        <Link to='/sign-in' className='header__auth-link'>Войти </Link>
      </Header>
      <div className='auth-form'>

        <form onSubmit={handleSubmit} className='auth-form__container' noValidate>
          <h3 className='auth-form__title'>Регистрация</h3>
          <div className='auth-form__row'>
            <input
              value={userData.email} onChange={handleChange}
              name='email' id='auth-form__input_type_email' className='auth-form__input auth-form__input_type_email' required
              placeholder='Email' type='email'
            />
            <span id='auth-form__input_type_email-error' className='popup-error' />
          </div>
          <div className='auth-form__row'>
            <input
              value={userData.password} onChange={handleChange}
              type='password'
              name='password' id='auth-form__input_type_password' className='auth-form__input auth-form__input_type_password' required placeholder='Пароль'
            />
            <span id='auth-form__input_type_password -error' className='popup-error' />
          </div>
          <button className='btn btn_type_auth js-place-submit'>Зарегистрироваться</button>
          <Link to='/sign-in' className='auth-form__redirect-link'>Уже зарегестрированы? Войти </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
