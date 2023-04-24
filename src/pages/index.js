import './index.css';
import Api from "../components/Api";
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithСonfirmation from '../components/PopupWithСonfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  configValidation,
  popupEditProfileSelector,
  popupAvatarSelector,
  popupAddCardSelector,
  popupCardImageSelector,
  popupFormConfirmationSelector,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  buttonOpenEditProfilePopup,
  buttonOpenAvatarPopup,
  buttonOpenAddCardPopup,
  formEditProfile,
  formAvatar,
  formCard,
  cardTemplateSelector,
  cardsContainerSelector
} from '../utils/constants.js';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'a24e7087-a96b-4b2b-8905-f0302e2d2b76',
    'Content-Type': 'application/json'
  }
}); 

// запрос на сервер:
// получить данные о пользователе
// получить карточки
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsContainer.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

  // Редактирование профиля

// открыть форму Редактировать профиль
const handleEditProfile = () => {
  const {name, about} = userInfo.getUserInfo();
  formEditProfile.name.value = name;
  formEditProfile.about.value = about;
  formProfileValidator.resetValidation();
  popupEditProfile.open();
};

// обработчик submit профиля
const handleSubmitProfile = (userData) => {
  popupEditProfile.renderLoading(true);
  // запрос на сервер: обновить данные о пользователе
  api.patchUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
};

// Добавление карточек

// обработчик клика по картинке карточки (открыть)
const handleCardClick = (cardImageSrc, cardImageAlt) => {
  popupCardImage.open(cardImageSrc, cardImageAlt);
};

// создать карточку
const createCard = (cardData) => {
  const card = new Card(
    cardData,
    userId,
    cardTemplateSelector,
    handleCardClick,
    {handleLikeClick: (cardId, isLiked) => {
        if (isLiked) {
          // запрос на сервер: удалить лайк
          api.deleteLike(cardId)
            .then((cardData) => {
              card.deleteLike(cardData.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          // запрос на сервер: поставить лайк
          api.putLike(cardId)
            .then((cardData) => {
              card.putLike(cardData.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        }
      },
      handleDeleteClick: (cardId) => {
        popupFormConfirmation.open();
        popupFormConfirmation.handleSubmit(() => {
          // запрос на сервер: удалить карточку
          api.deleteCard(cardId)
            .then((cardData) => {
              card.deleteCard(cardData._id);
              popupFormConfirmation.close();
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        })
      }
    },
  );
  const createdCard = card.generateCard();
  return createdCard;
};

// открыть форму Новое место
const handleAddCard = () => {
  formCardValidator.resetValidation();
  popupAddCard.open();
};

// обработчик submit/закрытия формы "Новое место"
const handleSubmitCard = (cardData) => {
  popupAddCard.renderLoading(true);
  // запрос на сервер: добавить карточку
  api.postCard(cardData)
    .then((cardData) => {
      cardsContainer.addItem(createCard(cardData));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    })
};

  // Обновление аватара

  // открыть форму "Обновить аватар"
  const handleOpenAvatar = () => {
    formAvatarValidator.resetValidation();
    popupAvatar.open();
  };
  
  // submit + закрыть форму "Обновить аватар"
  const handleSubmitAvatar = (userData) => {
    popupAvatar.renderLoading(true);
    // запрос на сервер: обновить аватар пользователя
    api.patchAvatar(userData)
      .then((userData) => {
        userInfo.setUserAvatar(userData);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      })
  };

// Экземпляры классов

const userInfo = new UserInfo(userNameSelector, userAboutSelector, userAvatarSelector);
const cardsContainer = new Section({ renderer: renderCard }, cardsContainerSelector);
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleSubmitProfile);
const popupAvatar = new PopupWithForm(popupAvatarSelector, handleSubmitAvatar);
const popupFormConfirmation = new PopupWithСonfirmation(popupFormConfirmationSelector);
const popupAddCard = new PopupWithForm(popupAddCardSelector,handleSubmitCard);
const popupCardImage = new PopupWithImage(popupCardImageSelector);
const formProfileValidator = new FormValidator(configValidation, formEditProfile);
const formCardValidator = new FormValidator(configValidation, formCard);
const formAvatarValidator = new FormValidator(configValidation, formAvatar); 

// ВАЛИДАЦИЯ ФОРМ

formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();

// СЛУШАТЕЛИ СОБЫТИЙ

buttonOpenEditProfilePopup.addEventListener('click', handleEditProfile);
buttonOpenAddCardPopup.addEventListener('click', handleAddCard);
buttonOpenAvatarPopup.addEventListener('click', handleOpenAvatar);
popupEditProfile.setEventListeners();
popupAvatar.setEventListeners();
popupFormConfirmation.setEventListeners();
popupAddCard.setEventListeners();
popupCardImage.setEventListeners();