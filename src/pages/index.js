import { Card } from '../components/Card.js';
import { validationConfig } from '../utils/validationConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import '../pages/index.css';

// Константы

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileForm = document.forms['profile_form'];
const cardForm = document.forms['card_form'];
const avatarForm = document.forms['avatar_form'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const config = validationConfig;
let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1',
    'Content-Type': 'application/json'
  }
});

// Вставка карточек на страницу из сервера

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userData.setUserInfo({
      userName: data.name,
      userJob: data.about,
      userAvatar: data.avatar,
      userId: data._id
    });
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(`Ошибка загрузки карточек: ${err}`);
  });


const userData = new UserInfo({
  userNameSelector: profileName,
  userDataSelector: profileJob,
  userAvatar: profileAvatar,
  userId: userId
});

// Открытие попапа карточки

function openImageCard(name, link) {
  popupImage.open(name, link);
}

// Создание новой карточки

const createCard = (item) => {
  const card = new Card(item.name, item.link, item.likes, item.owner._id, userData.userId, item._id, '#card-template', openImageCard, handleCardDelete, handleCardLike);
  const cardElement = card.generateCard();
  return cardElement;
};

const section = new Section({
  renderer: (item) => {
    section.addItem(createCard(item));
  }
}, '.elements__list');

// Открытие модального окна редактирования профиля

buttonEditProfile.addEventListener('click', () => {

  const currentUserData = userData.getUserInfo();
  // console.log(currentUserData);
  // profilePopup.setInputValues(currentUserData);
  nameInput.value = currentUserData.userName;
  jobInput.value = currentUserData.userJob;

  profilePopup.open();
  profileFormValidator.resetValidation();
});

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputValueData) => {
    profilePopup.renderLoading(true);
    api.editProfile(inputValueData).then((data) => {
      userData.setUserInfo({
        userName: data.name,
        userJob: data.about,
        userAvatar: data.avatar,
        userId: data._id
      });
      profilePopup.close();
    })
      .catch((err) => {
        console.error(`Ошибка изменения данных профиля: ${err}`);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  }
});

const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (inputValueData) => {
    newCardPopup.renderLoading(true);
    api.addNewCard(inputValueData).then((data) => {
      section.addItem(createCard(data, userData.userId));
      newCardPopup.close();
    })
      .catch((err) => {
        console.error(`Ошибка добавления новой карточки: ${err}`);
      })
      .finally(() => {
        newCardPopup.renderLoading(false);
      });
  }
});

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (inputValueData) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar(inputValueData).then((data) => {
      userData.setUserInfo({
        userName: data.name,
        userJob: data.about,
        userAvatar: data.avatar,
        userId: data._id
      });
      avatarPopup.close();
    })
      .catch((err) => {
        console.error(`Ошибка замены аватара: ${err}`);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  }
});

profileAvatar.addEventListener('click', () => {
  avatarPopup.open();
  avatarFormValidator.resetValidation();
});

// Удаление карточки

const handleCardDelete = (card) => {

  const submitConfirm = () => {
    api.deleteCard(card.cardId).then(() => {
      card.deleteCard();
      popupForDelete.close();
    })
      .catch((err) => {
        console.error(`Ошибка удаления карточки: ${err}`);
      });
  };
  popupForDelete.setAction(submitConfirm);
  popupForDelete.open();
};

// Добавление и снятие лайка с карточки

const handleCardLike = (card) => {
  if (card.isLiked()) {
    api.removeLike(card.cardId).then((data) => {
      card.removeLike();
      card.countLikeQuantity(data);
    })
      .catch((err) => {
        console.error(`Ошибка удаления лайка: ${err}`);
      });
  } else {
    api.addLike(card.cardId).then((data) => {
      card.setLike();
      card.countLikeQuantity(data);
    })
      .catch((err) => {
        console.error(`Ошибка добавления лайка: ${err}`);
      });
  }
};

// Открытие модального окна добавления карточки

buttonAddCard.addEventListener('click', () => {
  newCardPopup.open();
  newCardFormValidator.resetValidation();
});

const popupForDelete = new PopupWithConfirmation('.popup_type_delete');
const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();
avatarPopup.setEventListeners();
popupForDelete.setEventListeners();

// Валидация форм

const profileFormValidator = new FormValidator(config, profileForm);
const newCardFormValidator = new FormValidator(config, cardForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


