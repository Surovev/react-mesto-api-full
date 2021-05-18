
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup.js';

function App (props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [isErrorPopuptext, setIsErrorPopupText] = React.useState('Ошибка');

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    })
      .catch((error) => {
        errorPopup(error);
      });
  }, []);

  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick () {
    console.log(isEditAvatarPopupOpen);
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function errorPopup (text) {
    setIsErrorPopupText(text);

    setIsErrorPopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsErrorPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser (data) {
    api.setUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        errorPopup(error);
      });
  }

  function handleUpdateAvatar (data) {
    console.log(data);
    api.updateAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        errorPopup(error);
      });
  }

  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data);
    })
      .catch((error) => {
        errorPopup(error);
      });
  }, []);

  const [cards, setCards] = React.useState([]);

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((error) => {
        errorPopup(error);
      });
    } else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((error) => {
        errorPopup(error);
      });
    }
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter(item => item._id !== card._id));
    })
      .catch((error) => {
        errorPopup(error);
      });
  }

  function handleAddPlaceSubmit (data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        errorPopup(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>

        <Header />

        <Main
          onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
          setImgPopup={handleCardClick} cards={cards} onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}

        />
        <section className='elements' />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup isClose={closeAllPopups} stateImgPopup={selectedCard} handleCardClick={handleCardClick} />
        <PopupWithForm btnName='Да' popupName='delete'>
          <h3 className='popup__title'>Вы уверены?</h3>
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm btnName='Что же с нами теперь будет?' popupName='error' isOpen={isErrorPopupOpen} isClose={closeAllPopups}>
          <h3 className='popup__title'>{isErrorPopuptext}</h3>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
