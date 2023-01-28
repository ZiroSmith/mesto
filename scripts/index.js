let popupEditElement = document.querySelector('.popup_item');
let popupAddElement = document.querySelector('.popup_add');
// let popupExpandElement = document.querySelector('.xxxxx');
let ClosePopupEdit = document.querySelector('.popup__close-button_edit');
let ClosePopupAdd = document.querySelector('.popup__close-button_add');
// let ClosePopupExpand = document.querySelector('.popup__close-button_expand');
let formElement = document.querySelector('.form');
let popupButtonOpen = document.querySelector('.profile__edit-button');

let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');


let popupElement = document.querySelector('.popup');

function closePopup (){
  popupElement.classList.remove('popup_opened');
}
ClosePopupEdit.addEventListener('click', closePopup);
ClosePopupAdd.addEventListener('click', closePopup);
// ClosePopupExpand.addEventListener('click', closePopup);

//Открытие popup
let openPopup = function(){
  popupEditElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}
popupButtonOpen.addEventListener('click', openPopup);

//Закрытие popup
// let closePopup = function(){
//   popupEditElement.classList.remove('popup_opened');
// }
// popupButtonClose.addEventListener('click', closePopup);


// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);

//------------------СКРИПТ POPUP ДОБАВЛЕНИЯ КАРТОЧКИ---------------------------

let popupButtonAdd = document.querySelector('.profile__add-button');
let popupButtonCloseCLONE = document.querySelector('.popup__close-button-MODIFICATOR');


//Открытие POPUP ДОБАВЛЕНИЯ КАРТОЧКИ
let openPopupClone = function(){
  popupAddElement.classList.add('popup_opened');
}
popupButtonAdd.addEventListener('click', openPopupClone);

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
//переменные для добавления новой карточки юзером
// const submitButton = document.querySelector('.todolist-form_submit');
// const input = document.querySelector('.todolist-form_input');

//Добавление карточки юзером
// submitButton.addEventListener('click', (e) => {
//   e.preventDefault();

//   const card = createCard({ title: input.value });

//   elements.append(card);
// });



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