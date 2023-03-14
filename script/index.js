// Константы

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const formElement = document.querySelector('.popup__form');
const profileForm = document.querySelector('.popup__form_type_edit');
const cardForm = document.querySelector('.popup__form_type_add');
const inputElement = formElement.querySelector('.popup__input');
const formAdd = popupAdd.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const template = document.querySelector('#card-template').content.querySelector('.elements__item');
const cardList = document.querySelector('.elements__list');
const cardNameInput = popupAdd.querySelector('.popup__input_type_place');
const cardImageLink = popupAdd.querySelector('.popup__input_type_link');
const config = validationConfig;
const submitButtonEdit = document.querySelector('.popup__button_type_edit');
const submitButtonAdd = document.querySelector('.popup__button_type_add');


// Функция открытия модального окна

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия модального окна

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция изменения имени пользователя и описания профессии пользователя

function handleFormSubmit(event) {
  event.preventDefault();   // Отменяет стандартную отправку формы

  profileName.textContent = nameInput.value;   // Передаём значение из поля ввода имени пользователя в профиль пользователя на странице HTML
  profileJob.textContent = jobInput.value;   // Передаём значение из поля ввода описания в профиль пользователя на странице HTML

  closePopup(popupEdit);   // Закрываем модальное окно
  event.target.reset();
}

// Открытие модального окна редактирования профиля

editButton.addEventListener('click', function (event) {
  openPopup(popupEdit);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  disableButton(submitButtonEdit, config.disabledButtonClass);
});

// Открытие модального окна добавления карточки

addButton.addEventListener('click', function (event) {
  openPopup(popupAdd);

  disableButton(submitButtonAdd, config.disabledButtonClass);
});

// Закрытие модальных окон по нажатию на крестик

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// Закрытие модальных окон по кнопке ESCAPE

document.addEventListener('keydown', function (event) {
  const popupList = document.querySelectorAll('.popup');

  popupList.forEach(function (popup) {
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
});

// Закрытие модальных окон по клику на OVERLAY

document.addEventListener('click', function (event) {
  const popupList = document.querySelectorAll('.popup');

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
    const errorElement = document.querySelector(`${config.errorClassTemplate}${input.name}`);
    errorElement.textContent = '';
    input.classList.remove('.popup__input-error');
    input.textContent = '';
  });
}


// Передача новых данных в профиль

formElement.addEventListener('submit', handleFormSubmit);   // Вызываем функцию изменения информации пользователя по событию отправки формы, т.е. по клику на кнопку "Сохранить"

// Массив карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция создания карточки

function createCard(item) {
  const card = template.cloneNode(true);
  const likeButton = card.querySelector('.elements__like-icon');
  const deleteButton = card.querySelector('.elements__delete-icon');
  const cardImage = card.querySelector('.elements__image');

  card.querySelector('.elements__title').textContent = item.name;
  card.querySelector('.elements__image').src = item.link;
  card.querySelector('.elements__image').alt = item.name;

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('elements__like-icon_active');
  });

  deleteButton.addEventListener('click', function () {
    card.remove();
  });

  cardImage.addEventListener('click', function () {
    openPopup(popupImage);

    popupImage.querySelector('.popup__photo').src = item.link;
    popupImage.querySelector('.popup__photo').alt = item.name;
    popupImage.querySelector('.popup__name').textContent = item.name;
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

formAdd.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = cardNameInput.value;
  const image = cardImageLink.value;
  const card = createCard({ name: title, link: image });

  cardList.prepend(card);
  closePopup(popupAdd);
  event.target.reset();
});
