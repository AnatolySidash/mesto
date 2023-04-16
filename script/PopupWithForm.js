import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, addNewCard) {
    super(popupSelector);
    this._addNewCard = addNewCard;
    this._popupAddCard = document.querySelector('.popup_type_add');
    this._formAddCard = this._popupAddCard.querySelector('.popup__form');
    this._cardNameInput = this._popupAddCard.querySelector('.popup__input_type_name');
    this._cardImageLink = this._popupAddCard.querySelector('.popup__input_type_job');
  }

  _getInputValues() {
    this._formInputList = this._formAddCard.querySelectorAll('.popup__input');

    this._formInputList.forEach((input) => {
      input.name = input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._formAddCard.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }

  close() {
    super.close();
    this._formAddCard.reset();
  }
}
