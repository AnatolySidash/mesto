import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupOpenImage = document.querySelector('.popup_type_image');
    this._popupPhoto = this._popupOpenImage.querySelector('.popup__photo');
    this._popupName = this._popupOpenImage.querySelector('.popup__name');
  }

  open(link, name) {
    super.open();
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupName.textContent = name;
  }

}
