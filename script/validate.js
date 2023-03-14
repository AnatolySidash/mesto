
// Функция включения демонстрации типа ошибки

function showInputError(errorElement, validationMessage, activeErrorClass, inputElement, invalidInputClass) {
  errorElement.textContent = validationMessage;
  errorElement.classList.add(activeErrorClass);
  inputElement.classList.add(invalidInputClass);
}

// Функция отключения демонстрации типа ошибки

function hideInputError(errorElement, activeErrorClass, inputElement, invalidInputClass) {
  errorElement.classList.remove(activeErrorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(invalidInputClass);
}

// Функция проверки валидности вводимых данных
function checkInputValidity(input, errorClassTemplate, inputClassTemplate, activeErrorClass, invalidInputClass) {
  const errorElement = document.querySelector(`${errorClassTemplate}${input.name}`);
  const inputElement = document.querySelector(`${inputClassTemplate}${input.name}`);

  if (!input.validity.valid) {
    showInputError(errorElement, input.validationMessage, activeErrorClass, inputElement, invalidInputClass);
  } else {
    hideInputError(errorElement);  // класс добавляется, но не удаляется и появляется ошибка
  }
}

// Функция деактивации кнопки

function disableButton(submitButton, disabledButtonClass) {
  submitButton.classList.add(disabledButtonClass);
  submitButton.disabled = true;
}

// Функция активации кнопки

function enableButton(submitButton, disabledButtonClass) {
  submitButton.classList.remove(disabledButtonClass);
  submitButton.disabled = false;
}

// Функция проверки валидности данных во всех полях ввода

function hasInvalidInput(inputList) {
  return Array.from(inputList).some(function (input) {
    return !input.validity.valid;
  });
}

// Функция активации/деактивации кнопки при валидации

function toggleButtonState(submitButton, disabledButtonClass, inputList) {

  if (!hasInvalidInput(inputList)) {
    enableButton(submitButton, disabledButtonClass);
  } else {
    disableButton(submitButton, disabledButtonClass);
  }
}

// Функция добавления слушателя на форму и на поля ввода в форме

function setEventListeners(formList, config, disabledButtonClass, errorClassTemplate, activeErrorClass, inputClassTemplate, invalidInputClass) {

  formList.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(function (input) {
      input.addEventListener('input', function () {
        checkInputValidity(input, errorClassTemplate, activeErrorClass, inputClassTemplate, invalidInputClass);
        toggleButtonState(submitButton, disabledButtonClass, inputList);
      });
    });
  });
}

// Функция включения валидации формы

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  setEventListeners(formList, config, config.disabledButtonClass, config.errorClassTemplate, config.inputClassTemplate, config.activeErrorClass, config.invalidInputClass);
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  disabledButtonClass: 'popup__button_disabled',
  errorClassTemplate: '.popup__input-error_type_',
  inputClassTemplate: '.popup__input_type_',
  activeErrorClass: 'popup__input-error_active',
  invalidInputClass: 'popup__input_invalid'
};

enableValidation(validationConfig);
