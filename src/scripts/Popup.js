export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }

    // Открыть
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keydown", this._handleEscClose);
    }

    // Закрыть
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keydown", this._handleEscClose);
    }

    // Закрытие по Esc
    _handleEscClose = (evt) => { 
        if (evt.key === "Escape") {
             this.close();
        }
    }

    // Слушатели на закрытие по крестику и оверлею
    setEventListeners() {
        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close();
            }
            if (evt.target.classList.contains("popup__close-button")) {
                this.close();
            }
        });
    }

}