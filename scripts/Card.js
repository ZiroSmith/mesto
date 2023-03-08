class Card {
    constructor(data) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
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
      
        // Добавим данные
          this._element.querySelector('.card__image').src = this._link;
          this._element.querySelector('.card__image').alt = this._name;
          this._element.querySelector('.card__text').textContent = this._name;
      
        // Вернём элемент наружу
          return this._element;
    }
    
    //Открытие popup УВЕЛИЧЕНИЯ КАРТИНКИ
    _handleOpenPopup() {
        openPopup(popupExpandElement);
        cardTextExpand.textContent = this._name;
        cardImageExpand.src = this._link;
        cardImageExpand.alt = this._name;
    }


    _handleLikeClick() {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
      }

    _handleDeleteClick() {
        this._element.remove();
      }


    _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener("click", () => { this._handleOpenPopup(); });

        this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeClick());

        this._element.querySelector('.card__del-button').addEventListener('click', () => this._handleDeleteClick());
        
      }

}



  export default Card;