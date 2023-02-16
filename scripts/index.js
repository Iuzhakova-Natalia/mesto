/*данные для формы профайла*/
const buttonEdit = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_tupe_edit');
const closePopupEdit = document.querySelector('.popup__close-button_type_edit-profile');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formEditProfile = document.querySelector('.form_type_edit-profile');
let nameInput = document.querySelector('.form__input-text_type_name');
let jobInput = document.querySelector('.form__input-text_type_job');

/*данные для формы нового места*/
const buttonAdd = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const closePopupAdd = document.querySelector('.popup__close-button_type_new-place');
let formAddCard = document.querySelector('.form_type_add-card');
let cardNameInput = document.querySelector('.form__input-text_type_place');
let cardImageInput = document.querySelector('.form__input-text_type_link');

/*карточки*/
const cardsList = document.querySelector('.cards');
const cardTemplate= document.querySelector('#card-temlate').content;
const popupCard = document.querySelector('.popup_type_image');
const closePopupCard = document.querySelector('.popup__close-button_type_image');

/*массив*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* функции */

const openPopup = (type) => {
  type.classList.add('popup_opened'); 
  if (type === popupEditProfile) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  };
};

function closePopup () {
  popupEditProfile.classList.remove('popup_opened');
  popupNewPlace.classList.remove('popup_opened');
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
  cardName.alt = name;

  const likeButton = newCard.querySelector('.card__like');
  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });

  const deleteButton = newCard.querySelector('.card__delete');
  deleteButton.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  const popupCardImage = document.querySelector('.popup__image');
  const popupCardPlace = document.querySelector('.popup__place');
  const popupImage = document.querySelector('.popup_type_image');
  const bigImage = () => {
    openPopup(popupCard);
    popupCardImage.src = cardImage.src;
    popupCardImage.alt = cardPlace.alt;
    popupCardPlace.textContent = cardName.textContent;
  }
  cardImage.addEventListener("clik", bigImage);
  return newCard;
};
 
const renderCard =(name, link) => {
  cardsList.append(makeNewCard(name, link));
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});

const  handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  cardsList.prepend(makeNewCard(cardNameInput.value, cardImageInput.value));
  closePopup(popupNewPlace);
};

/*слушатели*/
buttonEdit.addEventListener('click', () => openPopup(popupEditProfile));
buttonAdd.addEventListener('click', () => openPopup(popupNewPlace));
formEditProfile.addEventListener('submit', handleFormSubmit); 
formAddCard.addEventListener('submit',  handleFormAddSubmit);
closePopupEdit.addEventListener('click', closePopup);
closePopupAdd.addEventListener('click', closePopup);
closePopupCard.addEventListener('click', closePopup);