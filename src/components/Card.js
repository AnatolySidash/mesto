export class Card {
  constructor(name, link, like, ownerId, templateSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._like = like;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);

    return cardElement;
  }

  _handleCardLike() {
    this._buttonLike.classList.toggle('elements__like-icon_active');
  }

  _handleDeleteIcon() {
    this._buttonDelete.classList.add('.elements__delete-icon_removed');
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._elementImage.addEventListener('click', () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.elements__like-icon');
    this._buttonDelete = this._element.querySelector('.elements__delete-icon');
    this._elementImage = this._element.querySelector('.elements__image');
    this._setEventListeners();

    // if (this._ownerId !== 'c685ea26409e45277dfd6630') {
    //   this._handleDeleteIcon(this._element);
    // }

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-count').textContent = this._like.length;

    return this._element;
  }

}




