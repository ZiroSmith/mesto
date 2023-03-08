import FormValidator from "./FormValidator.js";

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};
  
//Запуск валидации
const validFormEditProfile = new FormValidator(validationConfig, formProfileElement);
validFormEditProfile.enableValidation();
const validFormAddCard = new FormValidator(validationConfig, formElementAdd);
validFormAddCard.enableValidation();
