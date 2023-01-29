let popupElement = document.querySelector('.popup');
let popupEditElement = document.querySelector('.popup_item');
let popupAddElement = document.querySelector('.popup_add');
// let popupExpandElement = document.querySelector('.xxxxx');
let ClosePopupButton = document.querySelectorAll('.popup__close-button');
let formElement = document.querySelector('.form');
let popupButtonOpen = document.querySelector('.profile__edit-button');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');


//Открытие popup РЕДАКТИРОВАНИЯ ПРОФИЛЯ
let openPopup = function(){
  popupEditElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}
popupButtonOpen.addEventListener('click', openPopup);


//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
let popupButtonAdd = document.querySelector('.profile__add-button');
let popupButtonCloseCLONE = document.querySelector('.popup__close-button-MODIFICATOR');

let openPopupClone = function(){
  popupAddElement.classList.add('popup_opened');
}
popupButtonAdd.addEventListener('click', openPopupClone);


//Закрытие popup
const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
}

ClosePopupButton.forEach((CloseButton) => {
  CloseButton.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'))
  });
});


// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupElement);
}


// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);

//--------------------СКРИПТЫ ОТРИСОВКИ КАРТОЧЕК-------------------------------

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

const template = document.querySelector('#card-template').content.querySelector('.card');
const elements = document.querySelector('.elements');
const submitButton = document.querySelector('.form__save-button_create');
const inputTitle = document.querySelector('.form__input_type_title');
const inputLink = document.querySelector('.form__input_type_link');

//Добавление карточки юзером
submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const card = createCard({ name: input.value });

  elements.append(card);
});

renderCards(initialCards);

//Взаимодействие юзера с карточкой
function createCard(item) {
const card = template.cloneNode(true);
card.querySelector('.card__text').textContent = item.name;
card.querySelector('.card__image').src = item.link;
card.querySelector('.card__image').alt = item.alt;
// card.querySelector('.todolist-item__del').addEventListener('click', () => {
//   card.remove();
// });
return card;
}

//Отрисовка карточек при загрузке страницы
function renderCards(initialCards) {
  const cards = initialCards.map((item) => {
    return createCard(item);
  });

  elements.append(...cards);
}