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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
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

    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards () {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        Authorization: this._authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard (cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: { Authorization: this._authorization }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeLike (cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: { Authorization: this._authorization }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addLike (cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: { Authorization: this._authorization }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000/',
  cohort: ''
});

export default api;
