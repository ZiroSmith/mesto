export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Метод для запроса информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  //Метод для загрузки массива карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }
    )
    .then(this._checkResponse);
  }

  //Метод для редактирования информации в профиле
  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
    .then(this._checkResponse);
  }

  //Метод для изменения аватара пользователя
  editAvatar(data){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //Метод для добавления новой карточки (отправляет данные на сервер)
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  ///Метод для удаления карточки (запрашивает удаление данных с сервера)
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //Метод для добавления Like на карточке (запрашивает изменение данных на сервере)
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

   //Метод для удаления Like на карточке (запрашивает изменение данных на сервере)
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

}
