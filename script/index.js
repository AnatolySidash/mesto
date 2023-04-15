import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { validationConfig } from './validationConfig.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';

// Константы

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupOpenImage = document.querySelector('.popup_type_image');

const formElement = document.querySelector('.popup__form');
const profileForm = document.querySelector('.popup__form_type_edit');
const cardForm = document.querySelector('.popup__form_type_add');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const cardList = document.querySelector('.elements__list');
const cardNameInput = popupAddCard.querySelector('.popup__input_type_name');
const cardImageLink = popupAddCard.querySelector('.popup__input_type_job');
const config = validationConfig;

const closeButtons = document.querySelectorAll('.popup__close');
const popupPhoto = popupOpenImage.querySelector('.popup__photo');
const popupName = popupOpenImage.querySelector('.popup__name');


// Функция открытия модального окна

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEscape);
//   document.addEventListener('click', closePopupByOverlay);
// }

// Функция закрытия модального окна

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEscape);
//   document.removeEventListener('click', closePopupByOverlay);
// }

// Закрытие модальных окон по кнопке ESCAPE

// function closePopupByEscape(event) {

//   if (event.key === "Escape") {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }

// Функция изменения имени пользователя и описания профессии пользователя

function handleFormSubmit(event) {
  event.preventDefault();   // Отменяет стандартную отправку формы
  profileName.textContent = nameInput.value;   // Передаём значение из поля ввода имени пользователя в профиль пользователя на странице HTML
  profileJob.textContent = jobInput.value;   // Передаём значение из поля ввода описания в профиль пользователя на странице HTML
  closePopup(popupEditProfile);   // Закрываем модальное окно
}

// Открытие модального окна редактирования профиля

buttonEditProfile.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
  profileFormValidator.resetValidation();
});

// Открытие модального окна добавления карточки

buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
  newCardFormValidator.resetValidation();
  cardForm.reset();
});

// Закрытие модальных окон по нажатию на крестик

// closeButtons.forEach((button) => {
//   // находим 1 раз ближайший к крестику попап
//   const popup = button.closest('.popup');
//   // устанавливаем обработчик закрытия на крестик
//   button.addEventListener('click', function () {
//     closePopup(popup);
//   });
// });


// Закрытие модальных окон по клику на OVERLAY

// function closePopupByOverlay(event) {

//   const popupOpened = document.querySelector('.popup_opened');

//   if (event.target === popupOpened) {
//     closePopup(popupOpened);
//   }
// }

// Передача новых данных в профиль

formElement.addEventListener('submit', handleFormSubmit);   // Вызываем функцию изменения информации пользователя по событию отправки формы, т.е. по клику на кнопку "Сохранить"


// Создание новой карточки

// function createCard(name, link) {
//   const card = new Card(name, link, '#card-template', openImageCard);
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// Добавление новой карточки на страницу

formAddCard.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = cardNameInput.value;
  const link = cardImageLink.value;
  cardList.prepend(createCard(name, link));
  closePopup(popupAddCard);
  event.target.reset();
});

// Открытие попапа карточки

function openImageCard(link, name) {
  const popupImage = new PopupWithImage('.popup_type_image', link, name);
  popupImage.open();
  popupImage.setEventListeners();
}


// Вставка карточек на страницу из массива

// initialCards.forEach((item) => {
//   cardList.append(createCard(item.name, item.link));
// });

// Валидация форм

const profileFormValidator = new FormValidator(config, profileForm);
const newCardFormValidator = new FormValidator(config, cardForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

// Вставка карточек на страницу из массива

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#card-template', openImageCard);
    const cardElement = card.generateCard();
    section.addItem(cardElement);
  }
}, '.elements__list');

section.renderItems();

