import { initialCards } from './cards.js';

export class Card {
  constructor(name, link, likeButton, deleteButton) {
    this._name = name;
    this._link = link;
    this._likeButton = likeButton;
    this._deleteButton = deleteButton;
  }

  _getTemplate() {
    const cardElement = document.querySelector('#card-template').content.querySelector('.elements__item').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like-icon').addEventListener('click', () => {
      this._element.querySelector('.elements__like-icon').classList.toggle('elements__like-icon_active');
    });

    this._element.querySelector('.elements__delete-icon').addEventListener('click', () => {
      this._element.remove();
    });
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, item.likeButton, item.deleteButton);
  const cardElement = card.generateCard();
  const cardList = document.querySelector('.elements__list');
  cardList.append(cardElement);

});


