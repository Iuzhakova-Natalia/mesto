const editButton = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const closeBatton = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input-text_type_name');
let jobInput = document.querySelector('.form__input-text_type_job');


const handleEditButtonClick = () => {
  popup.classList.add('popup_opened'); 
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const handleCloseButtonClick =  () => {
    popup.classList.remove('popup_opened');  
  }

editButton.addEventListener('click', handleEditButtonClick);
closeBatton.addEventListener('click', handleCloseButtonClick);



function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  handleCloseButtonClick();

}

formElement.addEventListener('submit', handleFormSubmit); 

const addButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup-new-place');
const closeAddButton = popupNewPlace.querySelector('.popup-new-place__close');

const handleAddButtonClick = () => {
  popupNewPlace.classList.add('popup-new-place_opened'); 
  
}

const handleCloseAddButtonClick =  () => {
  popupNewPlace.classList.remove('popup-new-place_opened');

}

addButton.addEventListener('click', handleAddButtonClick);
closeAddButton.addEventListener('click', handleCloseAddButtonClick);