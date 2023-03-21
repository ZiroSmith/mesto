import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image-expand")
        this._title = this._popup.querySelector(".popup__text-expand")
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = 'Изображение ${data.name}';
        this._title.textContent = data.name;
        super.open();
    }

}