const objectForValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}; 


// Валидация не пройдена
const showInputError = (formElement, inputElement, errorMessage, objectForValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objectForValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectForValidation.errorClass);
};

// Валидация пройдена
const hideInputError = (formElement, inputElement, objectForValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objectForValidation.inputErrorClass);
  errorElement.classList.remove(objectForValidation.errorClass);
  errorElement.textContent = '';
};

// Проверка валидации
const checkInputValidity = (formElement, inputElement, objectForValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectForValidation);
  } else {
    hideInputError(formElement, inputElement, objectForValidation);
  }
};


const setEventListeners = (formElement, objectForValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(objectForValidation.inputSelector));
  const buttonElement = formElement.querySelector(objectForValidation.submitButtonSelector);

   toggleButtonState(inputList, buttonElement, objectForValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, objectForValidation);

      toggleButtonState(inputList, buttonElement, objectForValidation);
    });
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 


const toggleButtonState = (inputList, buttonElement, objectForValidation) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objectForValidation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(objectForValidation.inactiveButtonClass);
  }
};


function enableValidation(objectForValidation) {
  const formList = Array.from(document.querySelectorAll(objectForValidation.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement, objectForValidation);
});
};

enableValidation(objectForValidation);
