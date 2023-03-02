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

function checkInputValidity (formElement, inputElement, settings) {
  if (inputElement.validity.valid === true) {
      hideInputError(formElement, inputElement, settings);
  } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  }
}

function showInputError (formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError (formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

function setEventListeners (formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings); 

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, settings);
          toggleButtonState(inputList, buttonElement, settings);
      });
  });
};

function toggleButtonState (inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
  } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

enableValidation(settings); 