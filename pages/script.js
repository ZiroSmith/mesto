let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.input__save-button');
let popupButtonOpen = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.input__name');
let jobInput = document.querySelector('.input__profession');
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
formElement.addEventListener('click', handleFormSubmit);