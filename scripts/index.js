const editButton = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const closeBatton = popup.querySelector('.popup__close');

const handleEditButtonClick = () => {
  popup.classList.add('popup_opened');  
}

const handleCloseButtonClick = () => {
    popup.classList.remove('popup_opened');  
  }

editButton.addEventListener('click', handleEditButtonClick);
closeBatton.addEventListener('click', handleCloseButtonClick);


let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input-text_type_name').value;
let jobInput = document.querySelector('.form__input-text_type_job').value;

function handleFormSubmit (evt) {
  evt.preventDefault();

  nameInput = document.querySelector('.form__input-text_type_name').value;
  jobInput = document.querySelector('.form__input-text_type_job').value;

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;

  handleCloseButtonClick();

}

formElement.addEventListener('submit', handleFormSubmit); 