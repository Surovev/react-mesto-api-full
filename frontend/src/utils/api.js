const checkResponse = require('./checkResponse');

class Api {
  constructor (options) {
    this._options = options;
    // this._autorization = this._options.authorization;
    this._url = this._options.baseUrl;
    this._cohort = this._options.cohort;
  }

  setAutorization (token) {
    this._authorization = 'Bearer ' + token;
  }

  getUserInfo () {
    return fetch(`${this._url}users/me`, {
      headers: {
        Authorization: this._authorization
      }
    })
      .then(checkResponse);
  }

  setUserInfo (data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.desc
      })

    }).then(checkResponse);
  }

  updateAvatar (data) {
    return fetch(`${this._url}users/me/avatar/`, {
      method: 'PATCH',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${data.link}`
      })

    })
      .then(checkResponse);
  }

  getInitialCards () {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        Authorization: this._authorization
      }
    })
      .then(checkResponse);
  }

  addCard (data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.subtitle,
        link: data.link
      })
    })
      .then(checkResponse);
  }

  deleteCard (cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: { Authorization: this._authorization }
    }).then(checkResponse);
  }

  removeLike (cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: { Authorization: this._authorization }
    }).then(checkResponse);
  }

  addLike (cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: { Authorization: this._authorization }
    }).then(checkResponse);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000/',
  cohort: ''
});

export default api;
