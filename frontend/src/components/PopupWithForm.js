import React from 'react';

function PopupWithForm (props) {
  return (
    <div className={`popup ${!props.isOpen ? 'popup_hidden' : ''} js-popup-${props.popupName}`}>

      <form onSubmit={props.onSubmit} className='popup__container' noValidate>
        <h3 className='popup__title'>{props.title}</h3>
        <button onClick={props.isClose} className='btn btn_type_close' type='button' />
        {props.children}
        <button className='btn btn_type_text js-place-submit'>{props.btnName}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;
