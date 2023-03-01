const settings = {
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input-text_type_error-line',
  errorClass: 'form__input-error_active'
}

function enableValidation (settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
  });
}

// Функция, которая проверяет валидность поля
function checkInputValidity (formElement, inputElement, settings) {
  if (inputElement.validity.valid === true) {
      hideInputError(formElement, inputElement, settings);
  } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  }
}

// Функция, которая добавляет классы с ошибкой
function showInputError (formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = errorMessage;
}

// Функция, которая удаляет классы с ошибкой
function hideInputError (formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

// Слушатель для всех полей
function setEventListeners (formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings); // Вызовем toggleButtonState и передадим ей массив полей и кнопку

  inputList.forEach((inputElement) => {  // Обойдём все элементы полученной коллекции
      inputElement.addEventListener('input', () => { // каждому полю добавим обработчик события input
          checkInputValidity(formElement, inputElement, settings);
          toggleButtonState(inputList, buttonElement, settings);
      });
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState (inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
  } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
}

// Функция принимает массив полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

enableValidation(settings); 