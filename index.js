// Переменные

let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');


// Открытие и закрытие модального окна

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

// Функция изменения имени пользователя и описания профессии пользователя

function handleFormSubmit(event) {
  event.preventDefault();   // Отменяет стандартную отправку формы

  let nameValue = nameInput.value;   // Сохраняем значение поля ввода имени пользователя в новую переменную
  let jobValue = jobInput.value;   // Сохраняем значение поля ввода описания в новую переменную

  let profileName = document.querySelector('.profile__name');   // Сохраняем элемент DOM в переменную, в которую будем вставлять значения из поля ввода имени пользователя
  let profileJob = document.querySelector('.profile__description');   // Сохраняем элемент DOM в переменную, в которую будем вставлять значения из поля ввода описания

  profileName.textContent = nameValue;   // Передаём значение из поля ввода имени пользователя в профиль пользователя на странице HTML
  profileJob.textContent = jobValue;   // Передаём значение из поля ввода описания в профиль пользователя на странице HTML

  popup.classList.remove('popup_opened');   // Закрываем модальное окно
}

formElement.addEventListener('submit', handleFormSubmit);   // Вызываем функцию изменения информации пользователя по событию отправки формы, т.е. по клику на кнопку "Сохранить"
