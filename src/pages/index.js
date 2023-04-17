import './index.css';
import Api from "../components/Api";
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  configValidation,
  popupEditProfileSelector,
  popupAvatarSelector,
  popupAddCardSelector,
  popupCardImageSelector,
  buttonOpenEditProfilePopup,
  buttonOpenAvatarPopup,
  buttonOpenAddCardPopup,
  formEditProfile,
  formAvatar,
  formCard,
  cardTemplateSelector,
  cardsContainerSelector
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'a24e7087-a96b-4b2b-8905-f0302e2d2b76',
    'Content-Type': 'application/json'
  }
}); 

// валидатор формы "Редактировать профиль"
const formProfileValidator = new FormValidator(configValidation, formEditProfile);
formProfileValidator.enableValidation();

// валидатор формы "Обновить аватар"
const formAvatarValidator = new FormValidator(configValidation, formAvatar);
formAvatarValidator.enableValidation();

// валидатор формы "Новое место"
const formCardValidator = new FormValidator(configValidation, formCard);
formCardValidator.enableValidation();

// редактирование профиля
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
  //userAvatarSelector: '.profile__avatar'
});

// получить данные о пользователе с сервера
api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); 

// обработчик редактирования профиля
const handleEditProfile = () => {
  const {name, job} = userInfo.getUserInfo();
  formEditProfile.name.value = name;
  formEditProfile.job.value = job;
  formProfileValidator.resetValidation();
  popupEditProfile.open();
};

// обработчик submit профиля
const handleSubmitProfile = (userData) => {
  api.setUserInfo(userData)
  .then((userData) => {
    userInfo.setUserInfo(userData);
    popupEditProfile.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); 
};

/** Изменение аватара через попап */
buttonOpenAvatarPopup.addEventListener('click', () => {
  popupAvatar.open();
})

// обработчик Обновить аватар

const handleAvatarProfile = () => {
 
  formAvatarValidator.resetValidation();

}
// Добавление карточеки

// обработчик добавления карточки
const handleAddCard = () => {
  formCardValidator.resetValidation();
  popupAddCard.open();
};

// обработчик submit/закрытия формы "Новое место"
const handleSubmitCard = ({ name, link }) => {
  api.addCard({ name, link })
    .then((cardData) => {
      renderCard(cardData);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
};


// обработчик submit карточки
//const handleSubmitCard = ({place: name, link}) => {
 // renderCard({name, link});
 // popupAddCard.close();
//};

// картинка карточки
// обработчик клика по картинке карточки (открыть)
const handleCardClick = (cardImageSrc, cardImageAlt) => {
  popupCardImage.open(cardImageSrc, cardImageAlt);
};


// Отрисовка карточек

let cardsList;

// создать отдельную карточку
const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  return card.generateCard();
}

// отрисовать готовую карточку
const renderCard = (data) => {
  cardsList.addItem(createCard(data));
}

// отрисовать все карточки
const renderInitialCards = (cardsData) => {
  cardsList = new Section({
    items: cardsData,
    renderer: renderCard
  }, cardsContainerSelector);
  cardsList.renderItems();
}

// загрузить начальные карточки с сервера
api.getInitialCards()
  .then((cardsData) => {
    renderInitialCards(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); 

// слушатель клика по кнопке редактировать профиль (открыть)
buttonOpenEditProfilePopup.addEventListener('click', handleEditProfile);

// слушатель клика по кнопке Обновить аватар(открыть)
//buttonOpenAvatarPopup.addEventListener('click', handleAvatarProfile);

// слушатель клика по кнопке добавить карточку (открыть)
buttonOpenAddCardPopup.addEventListener('click', handleAddCard);

// слушатель submit профиля
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleSubmitProfile);
popupEditProfile.setEventListeners();

// слушатель submit карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitCard);
popupAddCard.setEventListeners();

// слушатель закрытия картинки карточки
const popupCardImage = new PopupWithImage(popupCardImageSelector);
popupCardImage.setEventListeners();
