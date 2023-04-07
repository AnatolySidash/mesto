export class Card {
  constructor(name, link, templateSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);

    return cardElement;
  }

  _handleCardLike() {
    this._element.querySelector('.elements__like-icon').classList.toggle('elements__like-icon_active');
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like-icon').addEventListener('click', () => {
      this._handleCardLike();
    });

    this._element.querySelector('.elements__delete-icon').addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleImageClick(this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__title').textContent = this._name;

    return this._element;
  }

}




