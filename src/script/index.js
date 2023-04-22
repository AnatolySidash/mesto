import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { validationConfig } from './validationConfig.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
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
const config = validationConfig;


const userData = new UserInfo({
  userNameSelector: profileName,
  userDataSelector: profileJob
});

// Открытие попапа карточки

function openImageCard(name, link) {
  const popupImage = new PopupWithImage('.popup_type_image', name, link);
  popupImage.open();
  popupImage.setEventListeners();
}

// Создание новой карточки

const createCard = (item) => {
  const card = new Card(item.name, item.link, '#card-template', openImageCard);
  const cardElement = card.generateCard();
  return cardElement;
};

// Вставка карточек на страницу из массива

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addItem(createCard(item));
  }
}, '.elements__list');

section.renderItems();


// Открытие модального окна редактирования профиля

buttonEditProfile.addEventListener('click', () => {
  const currentUserData = userData.getUserInfo();
  nameInput.value = currentUserData.userName;
  jobInput.value = currentUserData.userJob;

  profilePopup.open();
  profilePopup.setEventListeners();
  profileFormValidator.resetValidation();
});


const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: () => {
    userData.setUserInfo({
      userName: nameInput.value,
      userJob: jobInput.value
    });
  }
});


const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (item) => {
    const newCard = createCard(item);
    section.addItem(newCard);
  }
});


// Открытие модального окна добавления карточки

buttonAddCard.addEventListener('click', () => {

  newCardPopup.open();
  newCardPopup.setEventListeners();
  newCardFormValidator.resetValidation();
});


// Валидация форм

const profileFormValidator = new FormValidator(config, profileForm);
const newCardFormValidator = new FormValidator(config, cardForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();



