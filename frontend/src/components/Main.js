import React from 'react';
import avatar from '../blocks/profile/edit-avatar.svg';

// import api from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <section className='profile'>
        <div className='profile__avatar-wrapper'>
          <img className='profile__edit-avatar' src={avatar} alt='редактировать аватар' />
          <img onClick={props.onEditAvatar} src={currentUser.avatar} className='profile__avatar' alt='аватар' />
        </div>
        <div className='profile__info'>
          <div className='profile__block-title'>
            <h1 className='profile__title'> {currentUser.name}</h1>
            <button onClick={props.onEditProfile} className='btn btn_type_pencil' />
          </div>
          <p className='profile__subtitle'>{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className='btn btn_type_add' />
      </section>
      <section className='elements'>
        {props.cards.map(item => (<Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} key={item._id} card={item} onCardClick={props.setImgPopup} />))}
      </section>
    </>
  );
}

export default Main;
