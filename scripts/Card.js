class Card {
    constructor(data, handleExpandCard, template) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._handleExpandCard = handleExpandCard;
        this._template = template;
    }


    _getTemplate () { 
      const cardElement = document 
        .querySelector(this._template) 
        .content
        .querySelector('.card') 
        .cloneNode(true); 
 
      return cardElement; 
    } 


    generateCard() {
        // Добавим в разметку в приватное поле _element, чтобы у других элементов появитkся доступ к ней.
          this._element = this._getTemplate();
        
          this._linkImage = this._element.querySelector('.card__image');
          this._nameImage = this._element.querySelector('.card__text');
          this._likeButton = this._element.querySelector('.card__like-button');
          this._DeleteButton = this._element.querySelector('.card__del-button');

          // Добавим данные
          this._linkImage.src = this._link;
          this._linkImage.alt = this._name;
          this._nameImage.textContent = this._name;
      
          // Слушатель событий при генерации карточки
          this._setEventListeners();

        // Вернём элемент наружу
          return this._element;
    }


    _handleLikeClick() {
      this._likeButton.classList.toggle('card__like-button_active');
      }

    _handleDeleteClick() {
        this._element.remove();
      }


    _setEventListeners() {
        this._linkImage.addEventListener("click", () => {this._handleExpandCard(this._name, this._link); });

        this._likeButton.addEventListener('click', () => this._handleLikeClick());

        this._DeleteButton.addEventListener('click', () => this._handleDeleteClick());
        
      }

}

  export default Card;