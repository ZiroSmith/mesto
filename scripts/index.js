import {
  initialCards,
  validationConfig,
  formProfileElement,
  popupButtonOpen,
  formElementAdd,
  popupButtonAdd

} from "./constans.js";

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";


const containerSelector = ".elements";
const popupWithImageSelector = ".popup_type_expand";
const popupAddCardSelector = ".popup_type_add";
const popupEditProfileSelector = ".popup_type_item";
const nameSelector = ".profile__name";
const aboutSelector = ".profile__profession";


//----------------------------------- ВАЛИДАЦИЯ ------------------------------//
const validFormEditProfile = new FormValidator(
  validationConfig,
  formProfileElement
);
validFormEditProfile.enableValidation();
const validFormAddCard = new FormValidator(validationConfig, formElementAdd);
validFormAddCard.enableValidation();
//-----------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------
const userInfo = new UserInfo({ nameSelector, aboutSelector });

const submitEditProfileHandler = ({ title, data }) => {
  userInfo.setUserInfo({ title, data });
}
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, submitEditProfileHandler);
popupEditProfile.setEventListeners();
//-------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const clickImageHandler = (data) => {
  popupWithImage.open(data);
}

function createCard(item) {
  // Создаёт карточку и возвращает результат
  const card = new Card(item, clickImageHandler, "#card-template");
  const cardElement = card.generateCard();

  return cardElement;
}
//---------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------
const submitAddCardHandler = ({ title, data }) => {
  cardSection.addItem(createCard({ name: title, link: data }));
}
const popupAddCard = new PopupWithForm(popupAddCardSelector, submitAddCardHandler);
popupAddCard.setEventListeners();
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
const cardSectionData = { items: initialCards, renderer: createCard };
const cardSection = new Section(cardSectionData, containerSelector);
cardSection.renderItems();
//------------------------------------------------------------------------------


//Открытие popup РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupEdit = function () {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  validFormEditProfile.resetValidation();
};
popupButtonOpen.addEventListener("click", openPopupEdit);

//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
const openPopupAdd = function () {
  formElementAdd.reset();
  validFormAddCard.resetValidation();
  popupAddCard.open();
};
popupButtonAdd.addEventListener("click", openPopupAdd);

// //Закрытие popup
// const closePopup = function (popupElement) {
//   popupElement.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closePopupEsc);
// };

// // //функция закрытия попапов по клику на Esc
// const closePopupEsc = (evt) => {
//   if (evt.key === "Escape") {
//     popups.forEach(closePopup);
//   }
// };

// // Закрытие попапов по крестику и оверлею
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });


