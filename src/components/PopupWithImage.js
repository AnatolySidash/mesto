import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupName = this._popup.querySelector('.popup__name');
  }

  open(link, name) {
    super.open();
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupName.textContent = name;
  }

}
