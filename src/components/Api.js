export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._profileName = document.querySelector('.profile__name');
    this._profileJob = document.querySelector('.profile__description');
    this._profileAvatar = document.querySelector('.profile__avatar');
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

  editProfile() {
    return fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
      method: "PATCH",
      headers: {
        authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Иван',
        about: 30
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
