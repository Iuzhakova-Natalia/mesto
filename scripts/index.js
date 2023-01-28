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
