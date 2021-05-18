function Login () {
  return (
    <div className='login'>

      <form className='login__container' noValidate>
        <h3 className='login__title'>Вход</h3>
        <div className='login__row'>
          <input
            name='email' id='login__input_type_email' className='login__input login__input_type_email' required
            placeholder='Email' type='email'
          />
          <span id='login__input_type_email-error' className='popup-error' />
        </div>
        <div className='login__row'>
          <input
            name='password' id='login__input_type_password' className='login__input login__input_type_password' required placeholder='Пароль'
          />
          <span id='login__input_type_password -error' className='popup-error' />
        </div>
        <button className='btn btn_type_auth js-place-submit'>Войти</button>
      </form>
    </div>
  );
}

export default Login;
