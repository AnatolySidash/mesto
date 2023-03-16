// Константы

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupOpenImage = document.querySelector('.popup_type_image');

const formElement = document.querySelector('.popup__form');
const profileForm = document.querySelector('.popup__form_type_edit');
const cardForm = document.querySelector('.popup__form_type_add');
const inputElement = formElement.querySelector('.popup__input');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const template = document.querySelector('#card-template').content.querySelector('.elements__item');
const cardList = document.querySelector('.elements__list');
const cardNameInput = popupAddCard.querySelector('.popup__input_type_name');
const cardImageLink = popupAddCard.querySelector('.popup__input_type_job');
const config = validationConfig;
const submitEditButton = document.querySelector('.popup__button_type_edit');
const submitAddButton = document.querySelector('.popup__button_type_add');

const closeButtons = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');
const popupPhoto = popupOpenImage.querySelector('.popup__photo');
const popupName = popupOpenImage.querySelector('.popup__name');



// Функция открытия модального окна

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

// Функция закрытия модального окна

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

// Функция изменения имени пользователя и описания профессии пользователя

function handleFormSubmit(event) {
  event.preventDefault();   // Отменяет стандартную отправку формы
  profileName.textContent = nameInput.value;   // Передаём значение из поля ввода имени пользователя в профиль пользователя на странице HTML
  profileJob.textContent = jobInput.value;   // Передаём значение из поля ввода описания в профиль пользователя на странице HTML
  closePopup(popupEditProfile);   // Закрываем модальное окно
}

// Открытие модального окна редактирования профиля

buttonEditProfile.addEventListener('click', function (event) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
  disableButton(submitEditButton, config.disabledButtonClass);
  resetForm(profileForm);
});

// Открытие модального окна добавления карточки

buttonAddCard.addEventListener('click', function (event) {
  openPopup(popupAddCard);
  cardForm.reset();
  disableButton(submitAddButton, config.disabledButtonClass);
  resetForm(cardForm);
});

// Закрытие модальных окон по нажатию на крестик

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', function () {
    closePopup(popup);
  });

});

// Закрытие модальных окон по кнопке ESCAPE

function closePopupByEscape(event) {

  popupList.forEach(function (popup) {
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
};

// Закрытие модальных окон по клику на OVERLAY

document.addEventListener('click', function (event) {

  popupList.forEach(function (popup) {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

// Функция очистки формы

function resetForm(form) {

  const inputList = form.querySelectorAll('.popup__input');

  inputList.forEach(function (input) {
    const errorElement = form.querySelector(`${config.errorClassTemplate}${input.name}`);
    errorElement.textContent = '';
    input.classList.remove('.popup__input-error');
    input.classList.remove(config.invalidInputClass);
    input.textContent = '';
  });
}


// Передача новых данных в профиль

formElement.addEventListener('submit', handleFormSubmit);   // Вызываем функцию изменения информации пользователя по событию отправки формы, т.е. по клику на кнопку "Сохранить"


// Функция создания карточки



function createCard(item) {
  const card = template.cloneNode(true);
  const likeButton = card.querySelector('.elements__like-icon');
  const deleteButton = card.querySelector('.elements__delete-icon');
  const cardImage = card.querySelector('.elements__image');

  card.querySelector('.elements__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('elements__like-icon_active');
  });

  deleteButton.addEventListener('click', function () {
    card.remove();
  });

  cardImage.addEventListener('click', function () {
    popupPhoto.src = item.link;
    popupPhoto.alt = item.name;
    popupName.textContent = item.name;

    openPopup(popupOpenImage);
  });

  return card;
}

// Функция добавления карточек из массива

function renderCards() {
  const cards = initialCards.map(function (item) {
    return createCard(item);
  });
  cardList.append(...cards);
}

renderCards();

// Добавление новой карточки на страницу

formAddCard.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = cardNameInput.value;
  const image = cardImageLink.value;
  const card = createCard({ name: title, link: image });

  cardList.prepend(card);
  closePopup(popupAddCard);
  event.target.reset();
});
