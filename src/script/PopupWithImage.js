import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._link = link;
    this._name = name;
    this._popupOpenImage = document.querySelector('.popup_type_image');
    this._popupPhoto = this._popupOpenImage.querySelector('.popup__photo');
    this._popupName = this._popupOpenImage.querySelector('.popup__name');
  }

  open() {
    super.open();
    this._popupPhoto.src = this._link;
    this._popupPhoto.alt = this._name;
    this._popupName.textContent = this._name;
  }

}
