import Card from "./Card.js";

////Открытие popup УВЕЛИЧЕНИЯ КАРТИНКИ
const handleExpandCard = (name,link) => {
  cardTextExpand.textContent = name;
  cardImageExpand.src = link;
  cardImageExpand.alt = name;
  openPopup(popupExpandElement);
};

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, handleExpandCard);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);
});


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
}
popupButtonOpen.addEventListener('click', openPopupEdit);


//Открытие popup ДОБАВЛЕНИЯ КАРТОЧКИ
const openPopupAdd = function(){
  openPopup(popupAddElement);
  formElementAdd.reset();
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


//функция закрытия попапов по по клику на Esc
const closePopupEsc = (evt) => {
  popups.forEach((popup)=> {
    if(evt.key === 'Escape') {
      closePopup(popup);
    };
  });
};


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
