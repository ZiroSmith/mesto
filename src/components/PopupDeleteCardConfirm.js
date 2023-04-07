import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement =  this._popup.querySelector('.form');
  }

  setSubmitAction(submitFunction) {
    this._formSubmitAction = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitAction();
      this.close();
    });
  }
}