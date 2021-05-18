import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {
  const avatarRef = React.useRef();

  function handleSubmit (e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} btnName='Сохранить' popupName='avatar' isOpen={props.isOpen} isClose={props.isClose} title={'Обновить аватар'}>
      <div className='popup__row'>
        <input
          ref={avatarRef}
          name='link' id='popup__input_type_avatar' className='popup__input popup__input_type_link' type='url' required
          placeholder='Ссылка на картинку'
        />
        <span id='popup__input_type_avatar-error' className='popup-error' />
      </div>
    </PopupWithForm>

  );
}

export default EditAvatarPopup;
