let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let popupButtonOpen = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.form__close-button');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');



//Открытие popup
let openPopup = function(){
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}
popupButtonOpen.addEventListener('click', openPopup);

//Закрытие popup
let closePopup = function(){
  popupElement.classList.remove('popup_opened');
}
popupButtonClose.addEventListener('click', closePopup);


// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);



/*let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.form__save-button');
let popupButtonOpen = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.form__input_text_name');
let jobInput = document.querySelector('.form__input_text_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');



//Открытие popup
let openPopup = function(){
  popupElement.classList.add('popup_opened');
}
popupButtonOpen.addEventListener('click', openPopup);

//Закрытие popup
let closePopup = function(){
  popupElement.classList.remove('popup_opened');
}
popupButtonClose.addEventListener('click', closePopup);


// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('click', handleFormSubmit);*/ 