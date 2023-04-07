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
const buttonDeleteCardPopup = document.querySelector(".card__del-button");
const containerSelector = ".elements";
const popupWithImageSelector = ".popup_type_expand";
const popupEditAvatarSelector = ".popup_type_avatar";
const popupAddCardSelector = ".popup_type_add";
const popupEditProfileSelector = ".popup_type_item";
const popupDeleteCardSelector = ".popup_type_delete";
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
  buttonDeleteCardPopup,
  containerSelector,
  popupWithImageSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupDeleteCardSelector,
  nameSelector,
  jobSelector,
  avatarSelector
};
