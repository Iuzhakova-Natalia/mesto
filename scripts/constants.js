/*данные для формы профайла*/
export const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__button_type_edit"
);
export const popupEditProfile = document.querySelector(".popup_tupe_edit");
export const buttonCloseEditProfilePopup = document.querySelector(
  ".popup__close-button_type_edit-profile"
);
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
export const formEditProfile = document.querySelector(
  ".form_type_edit-profile"
);
export const nameInput = document.querySelector(".form__input-text_type_name");
export const jobInput = document.querySelector(".form__input-text_type_job");

/*данные для формы нового места*/
export const buttonOpenAddCardPopup = document.querySelector(
  ".profile__add-button"
);
export const popupNewPlace = document.querySelector(".popup_type_new-place");
export const buttenCloseAddCardPopup = document.querySelector(
  ".popup__close-button_type_new-place"
);
export const formAddCard = document.querySelector(".form_type_add-card");
export const cardNameInput = document.querySelector(
  ".form__input-text_type_place"
);
export const cardImageInput = document.querySelector(
  ".form__input-text_type_link"
);

/*карточки*/
export const cardsList = document.querySelector(".cards");
export const buttonClosePopupImageCard = document.querySelector(
  ".popup__close-button_type_image"
);
export const buttonSubmitCard = popupNewPlace.querySelector(".form__button");
export const popupCardImage = document.querySelector(".popup__image");
export const popupCardPlace = document.querySelector(".popup__place");
export const popupImageCard = document.querySelector(".popup_type_image");

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

export const formValidationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input-text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-text_type_error-line",
  errorClass: "form__input-error_active",
};
