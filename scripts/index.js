/*данные для формы профайла*/
const buttonOpenEditProfilePopup = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_tupe_edit');
const buttonCloseEditProfilePopup = document.querySelector('.popup__close-button_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.form_type_edit-profile');
const nameInput = document.querySelector('.form__input-text_type_name');
const jobInput = document.querySelector('.form__input-text_type_job');

/*данные для формы нового места*/
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const buttenCloseAddCardPopup = document.querySelector('.popup__close-button_type_new-place');
const formAddCard = document.querySelector('.form_type_add-card');
const cardNameInput = document.querySelector('.form__input-text_type_place');
const cardImageInput = document.querySelector('.form__input-text_type_link');

/*карточки*/
const cardsList = document.querySelector('.cards');
const cardTemplate= document.querySelector('#card-temlate').content;
const popupImageCard = document.querySelector('.popup_type_image');
const buttonClosePopupImageCard = document.querySelector('.popup__close-button_type_image');
const popup = document.querySelector('.popup_type_image');
const popupCardImage = popup.querySelector('.popup__image');
const popupCardPlace = popup.querySelector('.popup__place');

/* функции */

const openPopup =(popup)=> {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => { 
  popup.classList.remove('popup_opened'); 
}; 

const submitEditProfileForm = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
};

const makeNewCard =(name, link) => {
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardName = newCard.querySelector('.card__name');
  cardImage.src = link;
  cardName.textContent = name;
  cardImage.alt = name;

  const likeButton = newCard.querySelector('.card__like');
  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });

  const deleteButton = newCard.querySelector('.card__delete');
  deleteButton.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });
 
  const openImagePopup = () => {
    openPopup(popupImageCard);
    popupCardImage.src = cardImage.src;
    popupCardPlace.textContent = cardName.textContent;
    popupCardImage.alt =  cardName.textContent;
  }

  cardImage.addEventListener('click', openImagePopup);
  return newCard;
};
 
const renderInitialCard =(name, link) => {
  cardsList.append(makeNewCard(name, link));
};

initialCards.forEach((card) => {
  renderInitialCard(card.name, card.link);
});

const  submitAddCardForm = (evt) => {
  evt.preventDefault();
  cardsList.prepend(makeNewCard(cardNameInput.value, cardImageInput.value));
  evt.target.reset();
  closePopup(popupNewPlace);
};

/*слушатели*/
buttonOpenEditProfilePopup.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
buttonOpenAddCardPopup.addEventListener('click', () => openPopup(popupNewPlace));
formEditProfile.addEventListener('submit', submitEditProfileForm); 
formAddCard.addEventListener('submit',  submitAddCardForm);
buttonCloseEditProfilePopup.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
buttenCloseAddCardPopup.addEventListener('click', () => {
  closePopup(popupNewPlace);
});
buttonClosePopupImageCard.addEventListener('click', () => {
  closePopup(popupImageCard);
});