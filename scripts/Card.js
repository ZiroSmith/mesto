class Card {
    constructor(data, handleExpandCard) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._handleExpandCard = handleExpandCard;
    }


    _getTemplate () {
        const cardElement = document
          .querySelector('#card-template')
          .content
          .querySelector('.card')
          .cloneNode(true);
  
        return cardElement;
    }


    generateCard() {
        // Добавим в разметку в приватное поле _element, чтобы у других элементов появится доступ к ней.
          this._element = this._getTemplate();
        // Слушатель событий при генерации карточки
          this._setEventListeners();

          this._linkImage = this._element.querySelector('.card__image');
          this._nameImage = this._element.querySelector('.card__text');

          // Добавим данные
          this._linkImage.src = this._link;
          this._linkImage.alt = this._name;
          this._nameImage.textContent = this._name;
      
        // Вернём элемент наружу
          return this._element;
    }


    _handleLikeClick() {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
      }

    _handleDeleteClick() {
        this._element.remove();
      }


    _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener("click", () => {
           this._handleExpandCard(this._name, this._link); });

        this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeClick());

        this._element.querySelector('.card__del-button').addEventListener('click', () => this._handleDeleteClick());
        
      }

}

  export default Card;