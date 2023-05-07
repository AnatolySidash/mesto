export class Card {
  constructor(name, link, like, ownerId, userId, cardId, templateSelector, handleImageClick, handleCardDelete, handleCardLike) {
    this._name = name;
    this._link = link;
    this._like = like;
    this._ownerId = ownerId;
    this._userId = userId;
    this.cardId = cardId;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }


  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);

    return cardElement;
  }

  _handleDeleteIcon() {
    this._buttonDelete.classList.add('.elements__delete-icon_removed');
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike(this);
    });

    if (this._userId === this._ownerId) {
      this._buttonDelete.addEventListener('click', () => {
        this._handleCardDelete(this);
      });
    }

    this._elementImage.addEventListener('click', () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  setLike() {
    this._buttonLike.classList.add('elements__like-icon_active');
  }

  removeLike() {
    this._buttonLike.classList.remove('elements__like-icon_active');
  }

  countLikeQuantity(data) {
    this._likeCounter.textContent = data.likes.length;
    this._like = data.likes;
  }

  isLiked() {
    return this._like.some((item) => item._id === this._userId);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.elements__like-icon');
    this._buttonDelete = this._element.querySelector('.elements__delete-icon');
    this._elementImage = this._element.querySelector('.elements__image');
    this._likeCounter = this._element.querySelector('.elements__like-count');
    this._setEventListeners();

    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._likeCounter.textContent = this._like.length;

    return this._element;
  }

}




