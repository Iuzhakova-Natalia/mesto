/*данные для формы профайла*/
const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__button_type_edit"
);
const popupEditProfile = document.querySelector(".popup_tupe_edit");
const buttonCloseEditProfilePopup = document.querySelector(
  ".popup__close-button_type_edit-profile"
);
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const formEditProfile = document.querySelector(".form_type_edit-profile");
const nameInput = document.querySelector(".form__input-text_type_name");
const jobInput = document.querySelector(".form__input-text_type_job");

/*данные для формы нового места*/
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const popupNewPlace = document.querySelector(".popup_type_new-place");
const buttenCloseAddCardPopup = document.querySelector(
  ".popup__close-button_type_new-place"
);
const formAddCard = document.querySelector(".form_type_add-card");
const cardNameInput = document.querySelector(".form__input-text_type_place");
const cardImageInput = document.querySelector(".form__input-text_type_link");

/*карточки*/
const cardsList = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-temlate").content;
const buttonClosePopupImageCard = document.querySelector(
  ".popup__close-button_type_image"
);
const popupImageCard = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const popupCardPlace = document.querySelector(".popup__place");

const initialCards = [
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

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input-text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-text_type_error-line",
  errorClass: "form__input-error_active",
};
