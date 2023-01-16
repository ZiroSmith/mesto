let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.popup__button_save');
let popupButtonOpen = document.querySelector('.profile__button_edit');
let popupButtonClose = document.querySelector('.popup__button_close');
let nameInput = document.querySelector('.popup__form_name');
let jobInput = document.querySelector('.popup__form_profession');
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