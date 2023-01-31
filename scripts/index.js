const popupElement = document.querySelector('.popup');
const popupEditElement = document.querySelector('.popup_item');
const popupAddElement = document.querySelector('.popup_add');
const popupExpandElement = document.querySelector('.popup_expand');
const ClosePopupButton = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.form');
const popupButtonOpen = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const template = document.querySelector('#card-template').content.querySelector('.card');
const elements = document.querySelector('.elements');
const formElementAdd = document.querySelector('.form_add');
const inputTitle = document.querySelector('.form__input_type_title');
const inputLink = document.querySelector('.form__input_type_link');
const popupButtonAdd = document.querySelector('.profile__add-button');
const cardTextExpand = document.querySelector('.card__text_type_expand');
const cardImageExpand = document.querySelector('.card__image_type_expand');


//Открытие popup РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupEdit = function(){
  popupEditElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}
popupButtonOpen.addEventListener('click', openPopupEdit);


//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
const openPopupAdd = function(){
  popupAddElement.classList.add('popup_opened');
}
popupButtonAdd.addEventListener('click', openPopupAdd);


//Закрытие popup
const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
}

ClosePopupButton.forEach((CloseButton) => {
  CloseButton.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'))
  });
});


// Обработчик «отправки» формы профиля
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupElement);
}

// Обработчик сохранения изменений профиля:
formElement.addEventListener('submit', handleFormSubmit);


//Добавление карточки юзером
function handleAddCard (evt) {
  evt.preventDefault(); 

  const title = inputTitle.value;
  const alt = inputTitle.value;
  const link = inputLink.value;

  const cardNew = createCard({ name: title, link: link, alt: alt });

  elements.append(cardNew);
  evt.target.reset();
  closePopup(popupAddElement);
};

formElementAdd.addEventListener('submit', handleAddCard);


//Отрисовка карточек при загрузке страницы
function renderCards(initialCards) {
  const cards = initialCards.map((item) => {
    return createCard(item);
  });

  elements.append(...cards);
}

renderCards(initialCards);


//Взаимодействие юзера с карточкой
function createCard(item) {
  const card = template.cloneNode(true);
  const cardText = card.querySelector('.card__text');
  const cardImage = card.querySelector('.card__image');
  const cardLike = card.querySelector('.card__like-button');
  const cardDelete = card.querySelector('.card__del-button');

  cardText.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardDelete.addEventListener('click', () => {
    card.remove();
  });

  //Открытие popup УВЕЛИЧЕНИЯ КАРТИНКИ
  function cardClick() {
    popupExpandElement.classList.add('popup_opened');
    cardTextExpand.textContent = item.name;
    cardImageExpand.src = item.link;
    cardImageExpand.alt =item.name;
  }

  cardImage.addEventListener('click', cardClick);

  return card;
}
