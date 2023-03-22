export default class FormValidator {
  constructor(validConfig, form) {
    this._validConfig = validConfig;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(
      this._validConfig.submitButtonSelector
    );
    this._inputList = this._form.querySelectorAll(
      this._validConfig.inputSelector
    );
  }

  //Находит куда был ввод, проверяет валидность
  _checkInputValidity(evt) {
    //Нахожу инпут запустивший событие и привязанный к нему спан по id
    this._input = evt.target;
    this._errorElement = document.querySelector(`#${this._input.id}-error`);
    //Валиден - скрыть ошибку
    if (this._input.validity.valid) {
      this._hideInputError(this._input);
      //Иначе - подчеркнуть, показать текст ошибки
    } else {
      this._input.classList.add(this._validConfig.inputErrorClass);
      this._errorElement.textContent = this._input.validationMessage;
    }
  }

  //Валидация пройдена - скрыть интерфейс ошибки
  _hideInputError(input) {
    this._errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.remove(this._validConfig.inputErrorClass);
    input.classList.remove(this._validConfig.errorClass);
    this._errorElement.textContent = "";
  }

  //Активация и дезактивация кнопки в зависимости от валидности
  _toggleButton() {
    //Проверка валидности
    this._isFormValid = this._form.checkValidity();
    //Если не валидна - дезактивировать
    this._buttonSubmit.disabled = !this._isFormValid;
    this._buttonSubmit.classList.toggle(
      this._validConfig.inactiveButtonClass,
      !this._isFormValid
    );
  }

  //Публичный метод для проверки валидации
  enableValidation() {
    //Слушатель ввода и "замок" кнопки
    this._form.addEventListener("input", () => {
      this._toggleButton();
    });

    this._addInputListeners(this._form, this._validConfig);
    //По дефолту кнопка не активна
    this._toggleButton();

    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButton();
      }, 0);
    });
  }

  resetValidation() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //Находит все формы, добавляет обработчик события ввод - проверку валидности полей
  _addInputListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener("input", (evt) => {
        this._checkInputValidity(evt, this._validConfig);
      });
    });
  }
}
