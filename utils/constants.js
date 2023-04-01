
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const configValidation = {
  inputSelector: ".form__input-text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-text_type_error-line",
  errorClass: "form__input-error_active",
};

// попапы
export const popupEditProfileSelector = ".popup_tupe_edit";
export const popupAddCardSelector = ".popup_type_new-place";
export const popupCardImageSelector = ".popup_type_image";

// кнопки
export const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__button_type_edit"
);
export const buttonOpenAddCardPopup = document.querySelector(
  ".profile__add-button"
);

// форма Редактировать профиль
export const formEditProfile = document.forms["form-edit-profile"];

// форма Новое место
export const formCard = document.forms["form-add-card"];

// template и контейнер для карточек
export const cardTemplateSelector = '#card-template';
export const cardsContainerSelector = '.cards-container'; 