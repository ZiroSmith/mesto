import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.form');
        this._inputs = this._popup.querySelectorAll('.form__input');
        this._buttonSubmit = this._popup.querySelector('.form__save-button');
    }


    _getInputValues() {
        const inputsValues = {};
        this._inputs.forEach((input) => {
            inputsValues[input.name] = input.value;
        });
        return inputsValues;
    }

    setInputValues(data) {
        this._inputs.forEach((input) => {
            input.value = data[input.name];
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    loading(isLoading) {
        if (isLoading === true) {
          this._buttonSubmit.textContent = 'Сохранение...';
        }
        else {
          this._buttonSubmit.textContent = 'Сохранить';
        }
      }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues())
            this.close();
        })
    }
}