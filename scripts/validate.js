
// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');

// Выбираем элемент ошибки на основе уникального класса 
const formError = formElement.querySelector(`.${formInput.id}-error`);

// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
  element.classList.add('form__input_type_error');
  // Показываем сообщение об ошибке
  formError.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
  // Скрываем сообщение об ошибке
  formError.classList.remove('form__input-error_active');
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput);
  } else {
    // Если проходит, скроем
    hideInputError(formInput);
  }
};

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid); 
