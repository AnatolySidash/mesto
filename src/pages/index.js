import { Card } from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import { validationConfig } from '../utils/validationConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import '../pages/index.css';

// Константы

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const profileForm = document.querySelector('.popup__form_type_edit');
const cardForm = document.querySelector('.popup__form_type_add');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const config = validationConfig;


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '46ca9225-5df7-4ceb-a9c3-33677b40d8c1',
    'Content-Type': 'application/json'
  }
});

// Вставка карточек на страницу из сервера

// api.getInitialCards().then((cards) => {
//   const section = new Section({
//     items: cards,
//     renderer: (item) => {
//       section.addItem(createCard(item));
//     }
//   }, '.elements__list');
// });

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    const userId = data._id;
    const section = new Section({
      items: items,
      renderer: (item) => {
        section.addItem(createCard(item, userId));
      }
    }, '.elements__list');
    section.renderItems(items);
  });

// Вставка данных в профиль из сервера

api.getUserInfo().then((data) => {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  profileAvatar.src = data.avatar;
});

const userData = new UserInfo({
  userNameSelector: profileName,
  userDataSelector: profileJob
});

// Открытие попапа карточки

function openImageCard(name, link) {
  popupImage.open(name, link);
}

// Создание новой карточки

const createCard = (item, userId) => {

  const card = new Card(item.name, item.link, item.likes, item.owner._id, userId, item._id, '#card-template', openImageCard);
  const cardElement = card.generateCard();
  return cardElement;
};


// Открытие модального окна редактирования профиля

buttonEditProfile.addEventListener('click', () => {
  const currentUserData = userData.getUserInfo();
  nameInput.value = currentUserData.userName;
  jobInput.value = currentUserData.userJob;

  profilePopup.open();
  profileFormValidator.resetValidation();
});

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputValueData) => {
    api.editProfile(inputValueData).then((data) => {
      userData.setUserInfo({
        userName: inputValueData.name,
        userJob: inputValueData.job
      });
    });
  }
});

const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (inputValueData) => {
    api.addNewCard(inputValueData).then((data) => {
      section.addItem(createCard(data));
    });
  }
});

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (inputValueData) => {
    api.changeAvatar(inputValueData).then((data) => {
      profileAvatar.src = data.avatar;
    });
  }
});

profileAvatar.addEventListener('click', () => {
  avatarPopup.open();
});


// Открытие модального окна добавления карточки

buttonAddCard.addEventListener('click', () => {
  newCardPopup.open();
  newCardFormValidator.resetValidation();
});

const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();
avatarPopup.setEventListeners();

// Валидация форм

const profileFormValidator = new FormValidator(config, profileForm);
const newCardFormValidator = new FormValidator(config, cardForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();



