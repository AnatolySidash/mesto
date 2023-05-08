import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._form.querySelector('.popup__button');
    this._submitBtnText = this._submitBtn.textContent;
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  // setInputValues(data) {
  //   this._formInputList.forEach((input) => {
  //     input.value = data[input.name]; // Возвращает Undefined
  //   });
  // }

  _getInputValues() {

    const inputValueList = {};

    this._formInputList.forEach((input) => {
      const value = input.value;
      const name = input.name;

      inputValueList[name] = value;
    });
    return inputValueList;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputValueData = this._getInputValues();
      this._handleFormSubmit(inputValueData);
    });

  }

  close() {
    super.close();
    this._form.reset();
  }
}
