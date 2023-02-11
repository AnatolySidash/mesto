// Константы

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const closeEditPopupButton = popupEdit.querySelector('.popup__close');
const closeAddPopupButton = popupAdd.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const addCardButton = popupAdd.querySelector('.popup__button');


// Функция открытия модального окна редактирования профиля

function editPopupOpen() {
  popupEdit.classList.add('popup_opened');
}

// Функция открытия модального окна добавления карточки

function addPopupOpen() {
  popupAdd.classList.add('popup_opened');
}

// Функция закрытия модального окна редактирования профиля

function editPopupClose() {
  popupEdit.classList.remove('popup_opened');
}

// Функция закрытия модального окна редактирования профиля

function addPopupClose() {
  popupAdd.classList.remove('popup_opened');
}

// Функция изменения имени пользователя и описания профессии пользователя

function handleFormSubmit(event) {
  event.preventDefault();   // Отменяет стандартную отправку формы

  profileName.textContent = nameInput.value;   // Передаём значение из поля ввода имени пользователя в профиль пользователя на странице HTML
  profileJob.textContent = jobInput.value;   // Передаём значение из поля ввода описания в профиль пользователя на странице HTML

  editPopupClose();   // Закрываем модальное окно
}

// Открытие и закрытие модального окна редактирования профиля

editButton.addEventListener('click', function () {
  editPopupOpen();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeEditPopupButton.addEventListener('click', function () {
  editPopupClose();
});

// Открытие и закрытие модального окна добавления карточки

addButton.addEventListener('click', function () {
  addPopupOpen();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeAddPopupButton.addEventListener('click', function () {
  addPopupClose();
});


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


// Константы

const template = document.querySelector('#card-template').content.querySelector('.elements__item');
const cardList = document.querySelector('.elements__list');
const cardNameInput = popupAdd.querySelector('.popup__input_type_name');
const cardImageLink = popupAdd.querySelector('.popup__input_type_job');

// Функция создания карточки

function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector('.elements__title').textContent = item.name;
  card.querySelector('.elements__image').src = item.link;
  card.querySelector('.elements__image').alt = item.name;

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

addCardButton.addEventListener('click', function (event) {
  event.preventDefault();

  const title = cardNameInput.value;
  const image = cardImageLink.value;
  const card = createCard({ name: title, link: image });

  cardList.prepend(card);
  addPopupClose();
});

