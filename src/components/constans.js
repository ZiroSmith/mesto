//Массив стоковых карточек
// const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//     alt: "Архыз",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//     alt: "Челябинская область",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//     alt: "Иваново",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//     alt: "Камчатка",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//     alt: "Холмогорский район",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//     alt: "Байкал",
//   },
// ];

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const formProfileElement = document.querySelector(".form_edit");
const buttonOpenEditProfilePopup = document.querySelector(".profile__edit-button");
const formElementAdd = document.querySelector(".form_add");
const formElementEditAvatar = document.querySelector(".form_avatar");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const buttonOpenEditAvatarPopup = document.querySelector(".profile__avatar-button");
const containerSelector = ".elements";
const popupWithImageSelector = ".popup_type_expand";
const popupEditAvatarSelector = ".popup_type_avatar";
const popupAddCardSelector = ".popup_type_add";
const popupEditProfileSelector = ".popup_type_item";
const nameSelector = ".profile__name";
const jobSelector = ".profile__profession";
const avatarSelector = ".profile__avatar-image";

export {
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
};
