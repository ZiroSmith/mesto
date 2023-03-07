const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}; 


// Валидация не пройдена - отобразить интерфейс ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};


// Валидация пройдена - скрыть интерфейс ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Проверка валидации
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Создать массив обьектов форм, найти что проверять, проверить валидацию
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  // Дезактивация кнопки пока поля пустые
   formElement.addEventListener('reset', () => {
		setTimeout(() => {
			toggleButtonState(inputList, buttonElement, validationConfig)	
		}, 0);
	});

  // Применить проверку валидации к полю, где сработало собыие "Ввод"
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);

      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Проверка наличия результата "Невалидно"
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Активация\Дезактивация кнопки "Сохранить/Добавить"
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

// Создать массив объектов из popup-ов, проверить валидацию при отправке формы
function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement, validationConfig);
});
};

enableValidation(validationConfig);
