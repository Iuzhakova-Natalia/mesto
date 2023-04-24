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
  buttonEdit,
  buttonAvatar,
  buttonAdd,
  formProfile,
  formAvatar,
  formCard,
  popupFormProfileSelector,
  popupFormAvatarSelector,
  popupFormCardSelector,
  popupCardImageSelector,
  popupFormConfirmationSelector,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  cardTemplateSelector,
  cardsContainerSelector
} from '../utils/constants.js';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'f399a358-b7ca-4b29-94a1-1f340ae5085a',
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
const handleOpenFormProfile = () => {
  const { name, about } = userInfo.getUserInfo();
  formProfile.name.value = name;
  formProfile.about.value = about;
  formProfileValidator.resetValidation();
  popupFormProfile.open();
};

// submit + закрыть форму "Редактировать профиль"
const handleSubmitFormProfile = (userData) => {
  popupFormProfile.renderLoading(true);
  // запрос на сервер: обновить данные о пользователе
  api.patchUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupFormProfile.renderLoading(false);
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
    { handleLikeClick: (cardId, isLiked) => {
        if (isLiked) {
          // запрос на сервер: удалить лайк
          api.deleteLike(cardId)
            .then((cardData) => {
              card.deleteLike(cardData.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
        } else {
          // запрос на сервер: поставить лайк
          api.putLike(cardId)
            .then((cardData) => {
              card.putLike(cardData.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
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
            })
        })
      }
    },
  );
  const createdCard = card.generateCard();
  return createdCard;
};

// открыть форму "Новое место"
const handleOpenFormCard = () => {
  formCardValidator.resetValidation();
  popupFormCard.open();
};

// submit + закрыть форму "Новое место"
const handleSubmitFormCard = (cardData) => {
  popupFormCard.renderLoading(true);
  // запрос на сервер: добавить карточку
  api.postCard(cardData)
    .then((cardData) => {
      cardsContainer.addItem(createCard(cardData));
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupFormCard.renderLoading(false);
    })
};

  // Обновление аватара

  // открыть форму "Обновить аватар"
  const handleOpenFormAvatar = () => {
    formAvatarValidator.resetValidation();
    popupFormAvatar.open();
  };
  
  // submit + закрыть форму "Обновить аватар"
const handleSubmitFormAvatar = (userData) => {
  popupFormAvatar.renderLoading(true);
  // запрос на сервер: обновить аватар пользователя
  api.patchAvatar(userData)
    .then((userData) => {
      userInfo.setUserAvatar(userData);
      popupFormAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupFormAvatar.renderLoading(false);
    })
};


// Экземпляры классов

const userInfo = new UserInfo(userNameSelector, userAboutSelector, userAvatarSelector);
const cardsContainer = new Section({ renderer: createCard }, cardsContainerSelector);
const popupFormProfile = new PopupWithForm(popupFormProfileSelector, handleSubmitFormProfile);
const popupFormAvatar = new PopupWithForm(popupFormAvatarSelector, handleSubmitFormAvatar);
const popupFormConfirmation = new PopupWithСonfirmation(popupFormConfirmationSelector);
const popupFormCard = new PopupWithForm(popupFormCardSelector, handleSubmitFormCard);
const popupCardImage = new PopupWithImage(popupCardImageSelector);
const formProfileValidator = new FormValidator(configValidation, formProfile);
const formCardValidator = new FormValidator(configValidation, formCard);
const formAvatarValidator = new FormValidator(configValidation, formAvatar); 
// ВАЛИДАЦИЯ ФОРМ

formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();

// СЛУШАТЕЛИ СОБЫТИЙ

buttonEdit.addEventListener('click', handleOpenFormProfile);
buttonAdd.addEventListener('click', handleOpenFormCard);
buttonAvatar.addEventListener('click',  handleOpenFormAvatar);
popupFormProfile.setEventListeners();
popupFormAvatar.setEventListeners();
popupFormConfirmation.setEventListeners();
popupFormCard.setEventListeners();
popupCardImage.setEventListeners();