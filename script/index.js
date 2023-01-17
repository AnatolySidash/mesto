// Переменные

let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');


// Функция открытия модального окна

function popupOpen() {
  popup.classList.add('popup_opened');
}

// Функция закрытия модального окна

function popupClose() {
  popup.classList.remove('popup_opened');
}

// Функция изменения имени пользователя и описания профессии пользователя

function handleFormSubmit(event) {
  event.preventDefault();   // Отменяет стандартную отправку формы

  profileName.textContent = nameInput.value;   // Передаём значение из поля ввода имени пользователя в профиль пользователя на странице HTML
  profileJob.textContent = jobInput.value;   // Передаём значение из поля ввода описания в профиль пользователя на странице HTML

  popupClose();   // Закрываем модальное окно
}


// Открытие и закрытие модального окна

editButton.addEventListener('click', function () {
  popupOpen();
});

closeButton.addEventListener('click', function () {
  popupClose();
});

// Передача новых данных в профиль

formElement.addEventListener('submit', handleFormSubmit);   // Вызываем функцию изменения информации пользователя по событию отправки формы, т.е. по клику на кнопку "Сохранить"
