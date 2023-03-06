// Универсальная функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
} 


//Открытие popup РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupEdit = function(){
  openPopup(popupEditElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  hideInputError(formElement, inputElement, validationConfig);
}
popupButtonOpen.addEventListener('click', openPopupEdit);


//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
const openPopupAdd = function(){
  openPopup(popupAddElement);
  formElementAdd.reset();
  hideInputError(formElement, inputElement, validationConfig);
}
popupButtonAdd.addEventListener('click', openPopupAdd);


//Закрытие popup
const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//Закрытие popup - Клик по крестику
buttonsClosePopup.forEach((buttonClose) => {
  buttonClose.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'))
  });
});

//Закрытие popup - по кнопке Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}


// Функция для закрытия всех попапов по оверлею
popups.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup')) {
			closePopup(popup);
		}
	});
});

// Обработчик «отправки» формы профиля
function submitEditProfileForm (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEditElement);
}

// Обработчик сохранения изменений профиля:
formProfileElement.addEventListener('submit', submitEditProfileForm);


//Добавление карточки юзером
function handleAddCard (evt) {
  evt.preventDefault(); 

  const title = inputTitle.value;
  const alt = inputTitle.value;
  const link = inputLink.value;

  const cardNew = new Card({ name: title, link: link, alt: alt });
  const cardNewElement = cardNew.generateCard();

  elements.prepend(cardNewElement);
  evt.target.reset();
  closePopup(popupAddElement);
};

formElementAdd.addEventListener('submit', handleAddCard);
