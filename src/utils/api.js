const onError = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

class Api {
  constructor({ serverUrl, headers }) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  };

  getUserInfo() {
    return fetch (`${this._serverUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then (onError);
  };

  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then (onError);
  };

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  };

  addCard(name, info) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
      body: JSON.stringify({
        name: name,
        link: info
      })
    })
      .then (onError);
  };

  deleteCard(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
    })
      .then (onError);
  };

  editAvatar(url) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
      body: JSON.stringify({
        avatar: url,
      })
    })
      .then (onError);
  };

  editProfile(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    })
      .then (onError);
  };

  //добавление лайка
  addLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
    })
      .then (onError);
  }

  deleteLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
    })
      .then (onError);
  };
}

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: 'cc57414f-37f0-4296-8799-a8484f2a34e6',
    'Content-Type': 'application/json'
  }
});

export default api;
