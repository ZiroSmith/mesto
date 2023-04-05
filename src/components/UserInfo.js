export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent
          }
        return userInfo;
    }

    setUserInfo({ name, job, userId }) {
        this._name.textContent = name;
        this._job.textContent = job;
        this._userId = userId;
    }

    getUserId() {
        return this._userId;
      };

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }
}
