/*данные для формы профайла*/
const buttonEdit = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_tupe_edit');
const closePopupEdit = document.querySelector('.popup__close-button_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.form_type_edit-profile');
const nameInput = document.querySelector('.form__input-text_type_name');
const jobInput = document.querySelector('.form__input-text_type_job');

/*данные для формы нового места*/
const buttonAdd = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const closePopupAdd = document.querySelector('.popup__close-button_type_new-place');
const formAddCard = document.querySelector('.form_type_add-card');
const cardNameInput = document.querySelector('.form__input-text_type_place');
const cardImageInput = document.querySelector('.form__input-text_type_link');

/*карточки*/
const cardsList = document.querySelector('.cards');
const cardTemplate= document.querySelector('#card-temlate').content;
const popupCard = document.querySelector('.popup_type_image');
const closePopupCard = document.querySelector('.popup__close-button_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCardPlace = document.querySelector('.popup__place');

/* функции */

const openPopup =(popup)=> {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => { 
  popup.classList.remove('popup_opened'); 
}; 

const handleFormSubmit = (evt) => {
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
 
  const bigImage = () => {
    openPopup(popupCard);
    popupCardImage.src = cardImage.src;
    popupCardPlace.textContent = cardName.textContent;
    popupCardImage.alt =  cardName.textContent;
  }

  cardImage.addEventListener('click', bigImage);
  return newCard;
};
 
const renderCard =(name, link) => {
  cardsList.append(makeNewCard(name, link));
};

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});

const  handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  cardsList.prepend(makeNewCard(cardNameInput.value, cardImageInput.value));
  closePopup(popupNewPlace);
};

/*слушатели*/
buttonEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
buttonAdd.addEventListener('click', () => openPopup(popupNewPlace));
formEditProfile.addEventListener('submit', handleFormSubmit); 
formAddCard.addEventListener('submit',  handleFormAddSubmit);
closePopupEdit.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
closePopupAdd.addEventListener('click', () => {
  closePopup(popupNewPlace);
});
closePopupCard.addEventListener('click', () => {
  closePopup(popupCard);
});