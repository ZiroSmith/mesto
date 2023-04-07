class Card {
  constructor(data, clickImageHandler, template, {openPopupDeleteCard}, userId, api) {
    this._data = data;
    this._clickImageHandler = clickImageHandler;
    this._template = template;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._userId = userId;
    this._api = api;
    this._cardId = this._data._id;
    this._ownerId = this._data.owner._id;
    this._myLike = 0;
    this._likes = this._data.likes;
    this._likesQuantity = this._data.likes.length;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

//---------------------------------Блок "Создания Карточек"--------------------------
  // Подтвердить, что карточка именно наша
  _checkOwner() {
    if (this._ownerId === this._userId) {
      return true;
    } else {
      return false;
    }
  }


  generateCard() {
    this._element = this._getTemplate();

    this._linkImage = this._element.querySelector(".card__image");
    this._nameImage = this._element.querySelector(".card__text");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeNumber = this._element.querySelector('.card__like-number');
    this._deleteButton = this._element.querySelector(".card__del-button");

    // Добавим данные
    this._linkImage.src = this._data.link;
    this._linkImage.alt = this._data.name;
    this._nameImage.textContent = this._data.name;

    // Слушатель событий при генерации карточки
    this._setEventListeners();

    //----------------------Добавим условия-------------------
    if (!this._checkOwner()) {// если не наша карточка - убрать кнопку удаления
      this._deleteButton.remove();
    }
    if (this._checkMyLike()) {// если я лайкнул - лайк активен
      this._handleToggleLike();
      this._myLike++;
    }
    if (this._likesQuantity !== 0) {// Отображение кол-ва лайков
      this._likeNumber.textContent = this._likesQuantity;
    }
    //-------------------------------------------------------

    // Вернём элемент наружу
    return this._element;
  }

//Удалить карточку
  deleteCard() { 
    this._api.removeCard(this._cardId)
    .then(() => {
      this._deleteButton.closest('.card').remove();
    })
    .catch((err) => alert(err));
  }
//-----------------------------------------------------------------------------------



//----------------------------------------Блок "Like"--------------------------------
//Проверка наличия своего лайка
  _checkMyLike() {
    return this._likes.some((item) => {
      return item._id === this._userId;
    })
  }

//Добавить\убрать вид активного Like
  _handleToggleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

//Добавить\убрать Like
  _switchLike() {
    if (this._myLike === 0) {
      this._api.addLike(this._cardId)

      .then((cardData) => {
        this._likes = cardData.likes;
        this._likesQuantity = cardData.likes.length;
        this._likeNumber.textContent = this._likesQuantity;
      })

      .catch((err) => alert(err));
      this._api.addLike(this._cardId);
      this._handleToggleLike();
      this._myLike++;

    } else {
      this._api.deleteLike(this._cardId)

      .then((cardData) => {
        this._likes = cardData.likes;
        this._likesQuantity = cardData.likes.length;
        if (this._likesQuantity) {
          this._likeNumber.textContent = this._likesQuantity;
        } else {
          this._likeNumber.textContent = '';
        }
      })

      .catch((err) => alert(err));
      this._handleToggleLike();
      this._myLike--;
    }
  }
//------------------------------------------------------------------------------------

//Слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {this._switchLike();})

    if (this._checkOwner()) {
      this._deleteButton.addEventListener('click', () => {
          this._openPopupDeleteCard();
        });
    }

    this._linkImage.addEventListener('click', () => {
        this._clickImageHandler(this._data);
      });
  }
}

export default Card;
