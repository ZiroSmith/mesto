export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        return {
            title: this._name.textContent,
            data: this._about.textContent
        }
    }

    setUserInfo({ title, data }) {
        this._name.textContent = title;
        this._about.textContent = data;
    }
}
