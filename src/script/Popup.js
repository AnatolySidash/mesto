export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });

    document.addEventListener('click', (event) => {
      this.popupOpened = document.querySelector('.popup_opened');
      if (event.target === this.popupOpened) {
        this.close();
      }
    });

  }
}

