import {
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
  jobSelector,
  avatarSelector
} from "../components/constans.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '15675c85-a31a-4d79-a966-1f79c69a2b3e',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo( {nameSelector, jobSelector, avatarSelector} );


//Генерация карточек
const newSection = new Section(
  {
    renderer: (item) => {
      newSection.addItem(createCard(item))
    },
  }, containerSelector);


//Загрузка данных сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  // Деструктуризация ответа от сервера
  .then(([data, cards]) => {
    // Отрисовка данных пользователя
    userInfo.setUserInfo({ name: data.name, job: data.about, userId: data._id });
    userInfo.setUserAvatar({ avatar: data.avatar });
    // Отрисовка карточек
    const initialCardsReverse = cards.reverse();
    newSection.renderItems(initialCardsReverse);
  })
  .catch(err => {
    console.error(err)
  });


//-------------------Сабмит добавления карточки---------------------------------
const submitAddCardHandler = ({ title, data }) => {
  cardSection.addItem(createCard({ name: title, link: data }));
}
const popupAddCard = new PopupWithForm(popupAddCardSelector, submitAddCardHandler);
popupAddCard.setEventListeners();
//------------------------------------------------------------------------------


//----------------------------Информация профиля----------------------------------
// const userInfo = new UserInfo({ nameSelector, aboutSelector });

// const submitEditProfileHandler = ({ title, data }) => {
//   userInfo.setUserInfo({ title, data });
// }
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, submitEditProfileHandler);
popupEditProfile.setEventListeners();
//-------------------------------------------------------------------------------


//----------------------------------- ВАЛИДАЦИЯ -------------------------------//
const validFormEditProfile = new FormValidator(validationConfig, formProfileElement);
validFormEditProfile.enableValidation();

const validFormEditAvatar = new FormValidator(validationConfig, formElementEditAvatar);
validFormEditAvatar.enableValidation();

const validFormAddCard = new FormValidator(validationConfig, formElementAdd);
validFormAddCard.enableValidation();
//-----------------------------------------------------------------------------//


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