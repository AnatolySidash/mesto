export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  editProfile({ name, job }) {
    this._editButtonLoading(true);
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "about": job
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this._editButtonLoading(false);
      });
  }


  addNewCard({ name, link }) {
    this._addButtonLoading(true);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "link": link
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this._addButtonLoading(false);
      });
  }

  changeAvatar({ link }) {
    this._avatarButtonLoading(true);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        "avatar": link,
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this._avatarButtonLoading(false);
      });
  }

  _editButtonLoading(isLoading) {
    const editButton = document.querySelector('.popup__button_type_edit');
    if (isLoading) {
      editButton.textContent = 'Сохранение...';
    } else {
      editButton.textContent = 'Сохранить';
    }
  }

  _addButtonLoading(isLoading) {
    const addButton = document.querySelector('.popup__button_type_add');
    if (isLoading) {
      addButton.textContent = 'Создание...';
    } else {
      addButton.textContent = 'Создать';
    }
  }

  _avatarButtonLoading(isLoading) {
    const avatarButton = document.querySelector('.popup__button_type_avatar');
    if (isLoading) {
      avatarButton.textContent = 'Сохранение...';
    } else {
      avatarButton.textContent = 'Сохранить';
    }
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        "cardId": cardId,
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
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
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
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
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
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
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

}



