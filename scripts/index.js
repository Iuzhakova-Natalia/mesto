import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  buttonOpenEditProfilePopup,
  popupEditProfile,
  popups,
  profileName,
  profileJob,
  formEditProfile,
  nameInput,
  jobInput,
  buttonOpenAddCardPopup,
  popupNewPlace,
  formAddCard,
  cardNameInput,
  cardImageInput,
  cardsList,
  popupCardImage,
  popupCardPlace,
  popupImageCard,
  initialCards,
  configValidation,
} from "./constants.js";

// валидатор формы "Редактировать профиль"
const formProfileValidator = new FormValidator(
  configValidation,
  formEditProfile
);
formProfileValidator.enableValidation();

// валидатор формы "Новое место"
const formCardValidator = new FormValidator(configValidation, formAddCard);
formCardValidator.enableValidation();

// открыть попап
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

// закрыть попап
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

// обработчик нажатия Escape
const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// закрыть попап кликом на оверлей или крестик
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

// обработчик клика по картинке карточки
const openImagePopup = (name, link) => {
  openPopup(popupImageCard);
  popupCardImage.src = link;
  popupCardPlace.textContent = name;
  popupCardImage.alt = name;
};

//создать карточку
const generateCard = (data) => {
  const card = new Card(data, "#card-template", openImagePopup);
  return card.generateCard();
};

// добавить карточки из массива
initialCards.forEach((data) => {
  cardsList.append(generateCard(data));
});

// обработчик открытия формы "Редактировать профиль"
const openFormProfile = () => {
  formProfileValidator.resetValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
};

// обработчик submit формы "Редактировать профиль"
const submitFormProfile = () => {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// обработчик открытия формы "Новое место"
const openFormCard = () => {
  formCardValidator.resetValidation();
  openPopup(popupNewPlace);
};

// обработчик submit формы "Новое место"
const submitFormCard = (evt) => {
  const data = {
    name: cardNameInput.value,
    link: cardImageInput.value,
  };
  cardsList.prepend(generateCard(data));
  evt.target.reset();
  closePopup(popupNewPlace);
};

// слушатели

// открыть форму "Редактировать профиль"
buttonOpenEditProfilePopup.addEventListener("click", openFormProfile);

// сохранить (закрыть) форму "Редактировать профиль"
formEditProfile.addEventListener("submit", submitFormProfile);

// открыть форму "Новое место"
buttonOpenAddCardPopup.addEventListener("click", openFormCard);

// сохранить (закрыть) форму "Новое место"
formAddCard.addEventListener("submit", submitFormCard);
