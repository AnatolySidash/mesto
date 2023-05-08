export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  editProfile({ name, job }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "about": job
      })
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }


  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "link": link
      })
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  changeAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        "avatar": link,
      })
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        "cardId": cardId,
      })
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        "cardId": cardId,
      })
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  checkLikeQuantity({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "GET",
      headers: this._headers,
      body: JSON.stringify({
        "cardId": cardId,
      })
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        "id": id,
      })
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

}
