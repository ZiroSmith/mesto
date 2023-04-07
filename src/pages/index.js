import {
  validationConfig,
  formProfileElement,
  buttonOpenEditProfilePopup,
  formElementAdd,
  formElementEditAvatar,
  buttonOpenAddCardPopup,
  buttonOpenEditAvatarPopup,
  buttonDeleteCardPopup,
  containerSelector,
  popupWithImageSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupDeleteCardSelector,
  nameSelector,
  jobSelector,
  avatarSelector
} from "../components/constans.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCardConfirm from "../components/PopupDeleteCardConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '15675c85-a31a-4d79-a966-1f79c69a2b3e',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({ nameSelector, jobSelector, avatarSelector });


const dataName = document.querySelector('.form__input_type_name');
const dataJob = document.querySelector('.form__input_type_profession');

//-------------------Отрисовка изначальных данных при загрузке--------------------
//Создаёт карточку и возвращает результат
function createCard(item) {
  const card = new Card(item, clickImageHandler, '#card-template', {openPopupDeleteCard: () => {
    popupDeleteCardConfirm.open();
    popupDeleteCardConfirm.setSubmitAction(() => card.deleteCard());
  }}, userInfo.userId, api);
  return card.generateCard();
}

//Генерация карточек
const newSection = new Section(
  {
    renderer: (item) => {
      newSection.addItem(createCard(item))
    },
  }, containerSelector);


//Загрузка данных сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  // Деструктуризация ответа от сервера
  .then(([data, cards]) => {
    // Отрисовка данных пользователя
    userInfo.setUserInfo({ name: data.name, about: data.about });
    userInfo.setUserAvatar({ avatar: data.avatar });
    // Отрисовка карточек
    const initialCardsReverse = cards.reverse();
    newSection.renderItems(initialCardsReverse);
  })
  .catch(err => {
    console.error(err)
  });
//------------------------------------------------------------------------------



//---------------------Форма для изменения аватара------------------------------
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (data) => {
  popupEditAvatar.loading(true);
    api.editAvatar(data)

      .then((res) => {
        userInfo.setUserAvatar(res);
        popupEditAvatar.close();
      })

      .catch((err) => {
        console.error(err)
      })

      .finally(() => {
        popupEditAvatar.loading(false);
      });
  });
  popupEditAvatar.setEventListeners();
//------------------------------------------------------------------------------


//----------------Форма для редактирования информации о пользователе------------
const popupEditForm = new PopupWithForm(popupEditProfileSelector, (data) => {
    popupEditForm.loading(true);
    console.log('');
    api.editUserInfo(data)

      .then((res) => {
        userInfo.setUserInfo(res);
        //console.log('ВСЁ РАБОТАЕТ!');
        popupEditForm.close();
      })

      .catch((err) => {
        console.error(err)
        //console.log('ГРУСТНО-НЕВКУСНО НЕ РАБОТАЕТ');
      })

      .finally(() => {
        popupEditForm.loading(false);
      });
  });
popupEditForm.setEventListeners();
//------------------------------------------------------------------------------

//-------------------Сабмит добавления карточки---------------------------------
// const submitAddCardHandler = ({ title, data }) => {
//   newSection.addItem(createCard({ name: title, link: data }));
// }
// const popupAddCard = new PopupWithForm(popupAddCardSelector, submitAddCardHandler);
// popupAddCard.setEventListeners();
//------------------------------------------------------------------------------


const popupAddCard = new PopupWithForm(popupAddCardSelector,
  (data) => {
    popupAddCard.loading(true);
    const item = {
      link: data.link,
      name: data.title,
    }
    //console.log('WARNING!!!!!!!!!!!!!!!!!!!!');
    api.addCard(item)
      .then((element) => {
        newSection.addItem(createCard(element), true);
        popupAddCard.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupAddCard.loading(false);
      });
  }
);
popupAddCard.setEventListeners();


//----------------------------Развернуть картинку--------------------------------
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const clickImageHandler = (data) => {
  popupWithImage.open(data);
}
//------------------------------------------------------------------------------


//-------------------------------Удалить карточку--------------------------------
const popupDeleteCardConfirm = new PopupDeleteCardConfirm(popupDeleteCardSelector);
popupDeleteCardConfirm.setEventListeners();
//-------------------------------------------------------------------------------


//----------------------------------- ВАЛИДАЦИЯ -------------------------------//
const validFormEditProfile = new FormValidator(validationConfig, formProfileElement);
validFormEditProfile.enableValidation();

const validFormEditAvatar = new FormValidator(validationConfig, formElementEditAvatar);
validFormEditAvatar.enableValidation();

const validFormAddCard = new FormValidator(validationConfig, formElementAdd);
validFormAddCard.enableValidation();
//-----------------------------------------------------------------------------//


//Открытие popup РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupEdit = function () {
  const dataProfile = userInfo.getUserInfo()
  dataName.value = dataProfile.name;
  dataJob.value = dataProfile.job;
  popupEditForm.open();
  validFormEditProfile.resetValidation();
};
buttonOpenEditProfilePopup.addEventListener("click", openPopupEdit);

//Открытие popup ЗАГРУЗКИ АВАТАРА
const openPopupEditAvatar = function () {
  popupEditAvatar.open();
  validFormEditAvatar.resetValidation();
};
buttonOpenEditAvatarPopup.addEventListener("click", openPopupEditAvatar);

//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
const openPopupAdd = function () {
  formElementAdd.reset();
  validFormAddCard.resetValidation();
  popupAddCard.open();
};
buttonOpenAddCardPopup.addEventListener("click", openPopupAdd);

//Открытие popup ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ
// const openPopupDeleteCard = function () {
//   popupDeleteCardConfirm.open();
// };
// buttonDeleteCardPopup.addEventListener("click", openPopupDeleteCard);