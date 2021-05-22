import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Login (props) {
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
    e.preventDefault();
    props.onLogin(userData)
      .catch(err => props.errorPopup(err));
  };
  return (
    <>
      <Header>
        <Link to='/sign-up' className='header__auth-link'>Зарегистрироваться </Link>
      </Header>
      <div className='auth-form'>

        <form onSubmit={handleSubmit} className='auth-form__container' noValidate>
          <h3 className='auth-form__title'>Вход</h3>
          <div className='auth-form__row'>
            <input
              name='email' id='auth-form__input_type_email' className='auth-form__input auth-form__input_type_email' required
              placeholder='Email' type='email' value={userData.email} onChange={handleChange}
            />
            <span id='auth-form__input_type_email-error' className='popup-error' />
          </div>
          <div className='auth-form__row'>
            <input
              name='password' id='auth-form__input_type_password' className='auth-form__input auth-form__input_type_password' required placeholder='Пароль'
              type='password' value={userData.password} onChange={handleChange}
            />
            <span id='auth-form__input_type_password -error' className='popup-error' />
          </div>
          <button className='btn btn_type_auth js-place-submit'>Войти</button>
        </form>
      </div>
    </>
  );
}

export default Login;
