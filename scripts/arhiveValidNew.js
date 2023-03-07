// const formValidationConfig = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     errorClass: 'popup__input_type_error',
//     buttonSelector: '.popup__button-submit',
//     buttonDisabledClass: 'popup__button-submit_disabled'
// };

// class FormValidator {
//     constructor(data, formElement) {
//         this._inputSelector = data.inputSelector;
//         this._submitButtonSelector = data.submitButtonSelector;
//         this._inactiveButtonClass = data.inactiveButtonClass;
//         this._inputErrorClass = data.inputErrorClass;
//         this._errorClass = data.errorClass;
//         this._formElement = formElement;
//     }




const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }; 

class FormValidator {
    constructor(config) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }


    // Валидация не пройдена - отобразить интерфейс ошибки
    _showInputError(formElement, inputElement, errorMessage, validationConfig) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(validationConfig.errorClass);
    };


    // Валидация пройдена - скрыть интерфейс ошибки
    _hideInputError(formElement, inputElement, validationConfig) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.classList.remove(validationConfig.errorClass);
        errorElement.textContent = '';
    };


    // Проверка валидации
    _checkInputValidity (formElement, inputElement, validationConfig) {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
        } else {
            hideInputError(formElement, inputElement, validationConfig);
        }
    };


    // Создать массив обьектов форм, найти что проверять, проверить валидацию
    _setEventListeners (formElement, validationConfig) {
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
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }; 



    // Активация\Дезактивация кнопки "Сохранить/Добавить"
    _toggleButtonState (inputList, buttonElement, validationConfig) {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(validationConfig.inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'true');
        } else {
            buttonElement.classList.remove(validationConfig.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };


    // Создать массив объектов из popup-ов, проверить валидацию при отправке формы
    enableValidation(validationConfig) {
        const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
  
        setEventListeners(formElement, validationConfig);
        });
    };


    //Вызов был в конце файла валидации
    //enableValidation(validationConfig);

}


const forms = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
forms.forEach((form) => {
    const formValidator = new FormValidator(formValidationConfig, form);
    formValidator.enableValidation();
});