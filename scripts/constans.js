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

const popups = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_item');
const popupAddElement = document.querySelector('.popup_type_add');
const popupExpandElement = document.querySelector('.popup_type_expand');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const formProfileElement = document.querySelector('.form_edit');
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
const cardTextExpand = document.querySelector('.popup__text-expand');
const cardImageExpand = document.querySelector('.popup__image-expand');