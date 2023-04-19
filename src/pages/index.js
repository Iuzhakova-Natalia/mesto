import './index.css';
import Api from "../components/Api";
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  //initialCards,
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

// Редактирование профиля

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
  const {name, about} = userInfo.getUserInfo();
  formEditProfile.name.value = name;
  formEditProfile.about.value = about;
  formProfileValidator.resetValidation();
  popupEditProfile.open();
};

// обработчик submit профиля
const handleSubmitProfile = (userData) => {
  patchUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    popupEditProfile.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); 
};

// Добавление карточек

// обработчик клика по картинке карточки (открыть)
const handleCardClick = (cardImageSrc, cardImageAlt) => {
  popupCardImage.open(cardImageSrc, cardImageAlt);
};

// добавить карточку
const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    cardTemplateSelector,
    handleCardClick,
    {
      handleLikeClick: (cardId, isLiked) => {
        if (isLiked) {
          api.deleteLike(cardId)
            .then((cardData) => {
              card.deleteLike(cardData.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          api.putLike(cardId)
            .then((cardData) => {
              card.putLike(cardData.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        }
      }
    }
  );
  const generatedCard = card.generateCard();
  cardsContainer.addItem(generatedCard);
};


// открыть форму Новое место
const handleAddCard = () => {
  formCardValidator.resetValidation();
  popupAddCard.open();
};

// обработчик submit/закрытия формы "Новое место"
const handleSubmitCard = (cardData) => {
  api.postCard(cardData)
    .then((cardData) => {
      renderCard(cardData);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
};

// сервер: загрузить массив карточек
api.getCards()
  .then((cards) => {
    cardsContainer.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// Экземпляры классов

const userInfo = new UserInfo(userNameSelector, userAboutSelector);
const cardsContainer = new Section({ renderer: renderCard }, cardsContainerSelector);
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleSubmitProfile);
const popupAddCard = new PopupWithForm(popupAddCardSelector,handleSubmitCard);
const popupCardImage = new PopupWithImage(popupCardImageSelector);
const formProfileValidator = new FormValidator(configValidation, formEditProfile);
const formCardValidator = new FormValidator(configValidation, formCard); 

// ВАЛИДАЦИЯ ФОРМ

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

// СЛУШАТЕЛИ СОБЫТИЙ

buttonOpenEditProfilePopup.addEventListener('click', handleEditProfile);
buttonOpenAddCardPopup.addEventListener('click', handleAddCard);
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupCardImage.setEventListeners();

// слушатель клика по кнопке редактировать профиль (открыть)
//buttonOpenEditProfilePopup.addEventListener('click', handleEditProfile);

// слушатель клика по кнопке Обновить аватар(открыть)
//buttonOpenAvatarPopup.addEventListener('click', handleAvatarProfile);

// слушатель клика по кнопке добавить карточку (открыть)
//buttonOpenAddCardPopup.addEventListener('click', handleAddCard);

// слушатель submit профиля
//const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleSubmitProfile);
//popupEditProfile.setEventListeners();

// слушатель submit карточки
//const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitCard);
//popupAddCard.setEventListeners();

// слушатель закрытия картинки карточки
//const popupCardImage = new PopupWithImage(popupCardImageSelector);
//popupCardImage.setEventListeners();
