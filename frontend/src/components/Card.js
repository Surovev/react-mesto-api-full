import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
  `btn btn_type_delete ${isOwn ? ' ' : 'btn_type_delete_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `btn btn_type_like ${isLiked ? 'is-active' : ''}`;

  function handleLikeClick () {
    props.onCardLike(props.card);
  }

  function handleDeleteClick () {
    props.onCardDelete(props.card);
  }
  return (
    <div className='element'>
      <img onClick={() => props.onCardClick(props.card)} className='element__img' src={props.card.link} alt='#' />
      <div className='element__bottom-part'>
        <h2 className='element__subtitle'>{props.card.name}</h2>
        <div className='element__like'>
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className='element__like-counter'>{props.card.likes.length}</span>
        </div>
      </div>
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} />
    </div>
  );
}

export default Card;
