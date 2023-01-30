//Массив стоковых карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
]; 


let popupElement = document.querySelector('.popup');
let popupEditElement = document.querySelector('.popup_item');
let popupAddElement = document.querySelector('.popup_add');
let popupExpandElement = document.querySelector('.popup_expand');
let ClosePopupButton = document.querySelectorAll('.popup__close-button');
let formElement = document.querySelector('.form');
let popupButtonOpen = document.querySelector('.profile__edit-button');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

const template = document.querySelector('#card-template').content.querySelector('.card');
const elements = document.querySelector('.elements');
let formElementAdd = document.querySelector('.form_add');
const inputTitle = document.querySelector('.form__input_type_title');
const inputLink = document.querySelector('.form__input_type_link');

let popupButtonAdd = document.querySelector('.profile__add-button');


//Открытие popup РЕДАКТИРОВАНИЯ ПРОФИЛЯ
let openPopupEdit = function(){
  popupEditElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}
popupButtonOpen.addEventListener('click', openPopupEdit);


//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
let openPopupAdd = function(){
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
  card.querySelector('.card__text').textContent = item.name;
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__image').alt = item.alt;

  card.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  card.querySelector('.card__del-button').addEventListener('click', () => {
    card.remove();
  });

  //Открытие popup УВЕЛИЧЕНИЯ КАРТИНКИ
  card.querySelector('.card__image').addEventListener('click', function(){
    popupExpandElement.classList.add('popup_opened');
  });

  return card;
}

