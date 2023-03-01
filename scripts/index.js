/* функции */
const closeByEscape = (evt) => {  
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const openPopup =(popup)=> {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => { 
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
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

const popupList = document.querySelectorAll('.popup');

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')){
  closePopup(evt.currentTarget);
      }
    });
  });

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