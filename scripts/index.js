import {
  initialCards,
  validationConfig,
  popups,
  popupEditElement,
  popupAddElement,
  popupExpandElement,
  formProfileElement,
  popupButtonOpen,
  nameInput,
  jobInput,
  profileName,
  profileProfession,
  cardSectionSelector,
  formElementAdd,
  inputTitle,
  inputLink,
  popupButtonAdd,
  cardTextExpand,
  cardImageExpand,
} from "./constans.js";

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";

// ////Открытие popup УВЕЛИЧЕНИЯ КАРТИНКИ
// const handleExpandCard = (name, link) => {
//   cardTextExpand.textContent = name;
//   cardImageExpand.src = link;
//   cardImageExpand.alt = name;
//   openPopup(popupExpandElement);
// };

//Запуск валидации
const validFormEditProfile = new FormValidator(
  validationConfig,
  formProfileElement
);
validFormEditProfile.enableValidation();
const validFormAddCard = new FormValidator(validationConfig, formElementAdd);
validFormAddCard.enableValidation();

const containerSelector = ".elements";
const popupWithImageSelector = ".popup_type_expand"


const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const clickImageHandler = (data) => {
  popupWithImage.open(data);
}


function createCard(item) {
  // Создаёт карточку и возвращает результат
  const card = new Card(item, clickImageHandler, "#card-template");
  const cardElement = card.generateCard();

  return cardElement;
}

const cardSectionData = {
  items: initialCards,
  renderer: createCard
}

const cardSection = new Section(cardSectionData, containerSelector);

cardSection.renderItems();


// Универсальная функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

//Открытие popup РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupEdit = function () {
  openPopup(popupEditElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  validFormEditProfile.resetValidation();
};
popupButtonOpen.addEventListener("click", openPopupEdit);

//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
const openPopupAdd = function () {
  formElementAdd.reset();
  validFormAddCard.resetValidation();
  openPopup(popupAddElement);
};
popupButtonAdd.addEventListener("click", openPopupAdd);

//Закрытие popup
const closePopup = function (popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};

// // //функция закрытия попапов по клику на Esc
// const closePopupEsc = (evt) => {
//   if (evt.key === "Escape") {
//     popups.forEach(closePopup);
//   }
// };

// // Закрытие попапов по крестику и оверлею
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });

// Обработчик «отправки» формы профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEditElement);
}

// Обработчик сохранения изменений профиля:
formProfileElement.addEventListener("submit", submitEditProfileForm);



// initialCards.forEach((item) => {
//   const cardElement = createCard(item);
//   // Добавляем в DOM
//   cardSection.append(cardElement);
// });

//Добавление карточки юзером
function handleAddCard(evt) {
  evt.preventDefault();

  const title = inputTitle.value;
  const alt = inputTitle.value;
  const link = inputLink.value;

  const cardNewElement = createCard({ name: title, link: link, alt: alt });

  cardSectionSelector.prepend(cardNewElement);
  evt.target.reset();
  closePopup(popupAddElement);
}

formElementAdd.addEventListener("submit", handleAddCard);
