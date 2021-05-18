import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup (props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleChangeName (e) {
    setName(e.target.value);
  }

  function handleChangeDescription (e) {
    setDescription(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      desc: description
    });
  }

  return (
    <PopupWithForm btnName='Сохранить' popupName='profile' onSubmit={handleSubmit} isOpen={props.isOpen} isClose={props.isClose} title='Редактировать профиль'>
      <div className='popup__row'>
        <input
          value={name} onChange={handleChangeName}
          name='name' id='popup__input_type_name' className='popup__input popup__input_type_name' required
          placeholder='Введите имя' minLength='2' maxLength='40'
        />
        <span id='popup__input_type_name-error' className='popup-error' />
      </div>
      <div className='popup__row'>
        <input
          value={description} onChange={handleChangeDescription}
          name='desc' id='popup__input_type_desc' className='popup__input popup__input_type_desc' required placeholder='О себе'
          minLength='2' maxLength='200'
        />
        <span id='popup__input_type_desc-error' className='popup-error' />
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
