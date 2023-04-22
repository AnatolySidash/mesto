import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._formInputList = this._form.querySelectorAll('.popup__input');

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

      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
