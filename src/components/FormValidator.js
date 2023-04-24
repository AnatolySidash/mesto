
export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;

    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  resetValidation() {
    this._toggleButtonState();
    this.disableButton();

    this._inputList.forEach((input) => {
      const errorElement = this._form.querySelector(`${this._config.errorClassTemplate}${input.name}`);
      errorElement.textContent = '';
      input.classList.remove(this._config.activeErrorClass);
      input.classList.remove(this._config.invalidInputClass);
      input.textContent = '';
    });
  }

  // Метод включения демонстрации типа ошибки

  _showInputError(errorElement, input) {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.activeErrorClass);
    input.classList.add(this._config.invalidInputClass);
  }

  // Метод отключения демонстрации типа ошибки

  _hideInputError(errorElement, input) {
    errorElement.classList.remove(this._config.activeErrorClass);
    errorElement.textContent = '';
    input.classList.remove(this._config.invalidInputClass);
  }

  // Метод проверки валидности вводимых данных

  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`${this._config.errorClassTemplate}${input.name}`);
    if (!input.validity.valid) {
      this._showInputError(errorElement, input);
    } else {
      this._hideInputError(errorElement, input);
    }
  }

  // Метод деактивации кнопки

  disableButton() {
    this._submitButton.classList.add(this._config.disabledButtonClass);
    this._submitButton.disabled = true;
  }

  // Метод активации кнопки

  _enableButton() {
    this._submitButton.classList.remove(this._config.disabledButtonClass);
    this._submitButton.disabled = false;
  }

  // Метод проверки валидности данных во всех полях ввода

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // Метод активации/деактивации кнопки при валидации

  _toggleButtonState() {
    if (!this._hasInvalidInput(this._inputList)) {
      this._enableButton(this._submitButton, this._config.disabledButtonClass);
    } else {
      this.disableButton(this._submitButton, this._config.disabledButtonClass);
    }
  }

  // Метод добавления слушателя на форму и на поля ввода в форме

  _setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Метод включения валидации формы

  enableValidation() {
    this._setEventListeners();
  }
}
