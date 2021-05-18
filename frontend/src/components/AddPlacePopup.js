import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {
  const cardNameRef = React.useRef();
  const linkRef = React.useRef();

  function handleAddPlaceSubmit (e) {
    e.preventDefault();
    props.onAddPlace({
      subtitle: cardNameRef.current.value,
      link: linkRef.current.value
    });
    cardNameRef.current.value = '';
    linkRef.current.value = '';
  }

  return (
    <PopupWithForm onSubmit={handleAddPlaceSubmit} btnName='Создать' popupName='place' isOpen={props.isOpen} isClose={props.isClose} title="Новое место">

      <div className='popup__row'>
        <input
          ref={cardNameRef}
          name='subtitle' id='popup__input_type_subtitle' className='popup__input popup__input_type_subtitle' required
          placeholder='Название' minLength='2' maxLength='30'
        />
        <span id='popup__input_type_subtitle-error' className='popup-error' />
      </div>
      <div className='popup__row'>
        <input
          ref={linkRef}
          name='link' id='popup__input_type_link' className='popup__input popup__input_type_link' type='url' required
          placeholder='Ссылка на картинку'
        />
        <span id='popup__input_type_link-error' className='popup-error' />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
