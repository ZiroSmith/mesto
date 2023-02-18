
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
  inputTitle.value = '';
  inputLink.value = '';
}
popupButtonAdd.addEventListener('click', openPopupAdd);


//Закрытие popup
const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  hideInputError(formElement, inputElement, validationConfig);
}

//Закрытие popup - Клик по крестику
buttonsClosePopup.forEach((ButtonClose) => {
  ButtonClose.addEventListener('click', function (evt) {
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

  const cardNew = createCard({ name: title, link: link, alt: alt });

  elements.prepend(cardNew);
  evt.target.reset();
  closePopup(popupAddElement);
};

formElementAdd.addEventListener('submit', handleAddCard);


//Отрисовка карточек при загрузке страницы
function renderCards(initialCards) {
  const cards = initialCards.map((item) => {
    return createCard(item);
  });

  elements.append(...cards);
}

renderCards(initialCards);


//Взаимодействие пользователя с карточкой
function createCard(item) {
  const card = template.cloneNode(true);
  const cardText = card.querySelector('.card__text');
  const cardImage = card.querySelector('.card__image');
  const cardLike = card.querySelector('.card__like-button');
  const cardDelete = card.querySelector('.card__del-button');

  cardText.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardDelete.addEventListener('click', () => {
    card.remove();
  });

  //Открытие popup УВЕЛИЧЕНИЯ КАРТИНКИ
  function clickCard() {
    openPopup(popupExpandElement);
    cardTextExpand.textContent = item.name;
    cardImageExpand.src = item.link;
    cardImageExpand.alt =item.name;
  }

  cardImage.addEventListener('click', clickCard);

  return card;
}
