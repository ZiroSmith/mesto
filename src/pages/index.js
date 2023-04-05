import {
  initialCards,
  validationConfig,
  formProfileElement,
  buttonOpenEditProfilePopup,
  formElementAdd,
  formElementEditAvatar,
  buttonOpenAddCardPopup,
  buttonOpenEditAvatarPopup,
  containerSelector,
  popupWithImageSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  nameSelector,
  aboutSelector
} from "../components/constans.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
//import UserAvatar from "../components/UserAvatar.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";


//----------------------------------- ВАЛИДАЦИЯ -------------------------------//
const validFormEditProfile = new FormValidator(validationConfig, formProfileElement);
validFormEditProfile.enableValidation();

const validFormEditAvatar = new FormValidator(validationConfig, formElementEditAvatar);
validFormEditAvatar.enableValidation();

const validFormAddCard = new FormValidator(validationConfig, formElementAdd);
validFormAddCard.enableValidation();
//-----------------------------------------------------------------------------//


//----------------------------Информация профиля----------------------------------
const userInfo = new UserInfo({ nameSelector, aboutSelector });

const submitEditProfileHandler = ({ title, data }) => {
  userInfo.setUserInfo({ title, data });
}
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, submitEditProfileHandler);
popupEditProfile.setEventListeners();
//-------------------------------------------------------------------------------


//----------------------------Сменить аватар-------------------------------------
const userAvatar = new PopupWithForm(popupEditAvatarSelector);
userAvatar.setEventListeners();
//-------------------------------------------------------------------------------


//----------------------------Развернуть картинку--------------------------------
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const clickImageHandler = (data) => {
  popupWithImage.open(data);
}
//------------------------------------------------------------------------------


//-----------------Создаёт карточку и возвращает результат----------------------
function createCard(item) {
  const card = new Card(item, clickImageHandler, "#card-template");
  const cardElement = card.generateCard();

  return cardElement;
}
//-------------------------------------------------------------------------------


//-------------------Сабмит добавления карточки---------------------------------
const submitAddCardHandler = ({ title, data }) => {
  cardSection.addItem(createCard({ name: title, link: data }));
}
const popupAddCard = new PopupWithForm(popupAddCardSelector, submitAddCardHandler);
popupAddCard.setEventListeners();
//------------------------------------------------------------------------------


//-------------------Отрисовка дефолтных карточек-------------------------------
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
buttonOpenEditProfilePopup.addEventListener("click", openPopupEdit);

//Открытие popup ЗАГРУЗКИ АВАТАРА
const openPopupEditAvatar = function () {
  userAvatar.open();
};
buttonOpenEditAvatarPopup.addEventListener("click", openPopupEditAvatar);

//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
const openPopupAdd = function () {
  formElementAdd.reset();
  validFormAddCard.resetValidation();
  popupAddCard.open();
};
buttonOpenAddCardPopup.addEventListener("click", openPopupAdd);

//Открытие popup ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ
// const openPopupDeleteCard = function () {
//   userAvatar.open();
// };
// buttonOpenDeleteCardPopup.addEventListener("click", openPopupDeleteCard);