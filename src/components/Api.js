export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-65/users/me', {
      headers: {
        authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1'
      }
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
      headers: {
        authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1'
      }
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
      method: "PATCH",
      headers: {
        authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1',
        'Content-Type': 'application/json'
      },
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
      method: "POST",
      headers: {
        authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1',
        'Content-Type': 'application/json'
      },
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me/avatar', {
      method: "PATCH",
      headers: {
        authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1',
        'Content-Type': 'application/json'
      },
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

}

  // deleteCard( id ) {
  //   return fetch(`https://mesto.nomoreparties.co/v1/cohortId/cards/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "id": id,
  //     })
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         return Promise.reject(`Ошибка: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

