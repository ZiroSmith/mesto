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
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
    }


    // Валидация не пройдена - отобразить интерфейс ошибки
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };


    // Валидация пройдена - скрыть интерфейс ошибки
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };


    // Проверка валидации
    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this_showInputError(inputElement, inputElement.validationMessage);
        } else {
            this_hideInputError(inputElement);
        }
    };


    // Создать массив обьектов форм, найти что проверять, проверить валидацию
    _setEventListeners () {
        const inputList = Array.from(this_formElement.querySelectorAll(this.inputSelector));
      
        // Дезактивация кнопки пока поля пустые
         this_formElement.addEventListener('reset', () => {
              setTimeout(() => {
                  _toggleButtonState()	
              }, 0);
          });
      
        // Применить проверку валидации к полю, где сработало собыие "Ввод"
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
            this_checkInputValidity(inputElement);
      
            this_toggleButtonState();
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
    _toggleButtonState () {
        if (this_hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'true');
        } else {
            buttonElement.classList.remove(this.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };


    // Создать массив объектов из popup-ов, проверить валидацию при отправке формы
    enableValidation() {
        this._formElement.addEventListener('submit', this._disableSubmit);
        this._setEventListeners();
        this._toggleButtonState();
        this._formElement.dispatchEvent(new Event('input')); // эмулируем событие 'input' для первоначальной проверки валидности формы
    }
}


const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
forms.forEach((form) => {
    const formValidator = new FormValidator(validationConfig, form);
    formValidator.enableValidation();
});