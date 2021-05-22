
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { register, authorize, getContent } from '../utils/mestoAuth';

function App (props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [isErrorPopuptext, setIsErrorPopupText] = React.useState('Ошибка');

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [toolTipState, setToolTipState] = React.useState({ type: '', text: '' });
  const [cards, setCards] = React.useState([]);
  const [authUser, setAuthUser] = React.useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(window.localStorage.getItem('jwt'));

  const history = useHistory();
  React.useEffect(() => {
    if (authToken) {
      getContent(authToken).then(({ data }) => {
        setCurrentUser(data);
      })
        .catch((error) => {
          errorPopup(error);
        });
    }
  }, []);

  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function errorPopup (text) {
    const message = text.message ? text.message : text;
    setIsErrorPopupText(message);

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
    setIsInfoToolTipOpen(false);
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
    api.updateAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        errorPopup(error);
      });
  }

  function handleInfoToolTip () {
    setIsInfoToolTipOpen(true);
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
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
  useEffect(() => {
    if (authToken) {
      getContent(authToken).then((data) => {
        if (data) {
          api.setAutorization(authToken);
          setLoggedIn(true);
          setAuthUser(data.data);
          history.push('/');
        }
      });
    }
  }, [authToken]);

  const handleLogin = ({ email, password }) => {
    return authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setAuthToken(data.token);
          window.localStorage.setItem('jwt', data.token);
          history.push('/');
          // tokenCheck();
        }
      });
  };

  const handleRegister = ({ password, email }) => {
    return register({ password, email }).then((res) => {
      setToolTipState({ type: 'ok', text: 'Вы успешно зарегистировались!' });
      handleInfoToolTip();

      history.push('/sign-in');
      return res;
    }).catch(res => {
      handleInfoToolTip();
      setToolTipState({ type: 'error', text: 'Что-то пошло не так! Попробуйте еще раз.' });
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>
        <Switch>
          <ProtectedRoute
            exact path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            setImgPopup={handleCardClick} cards={cards} setCards={setCards} errorPopup={errorPopup} onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} authUser={authUser}
            onSignOut={() => {
              setAuthUser({});
              window.localStorage.removeItem('jwt');
            }}
          />

          <Route path='/sign-in'>
            <Login onLogin={handleLogin} errorPopup={errorPopup} isClose={closeAllPopups} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route>
            {loggedIn ? (
              <Redirect to='/' />
            ) : (
              <Redirect to='/sign-in' />
            )}
          </Route>
        </Switch>
        <section className='elements' />

        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <InfoToolTip type={toolTipState.type} text={toolTipState.text} isOpen={isInfoToolTipOpen} isClose={closeAllPopups} />
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
