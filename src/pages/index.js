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
  popupAddCardSelector,
  popupCardImageSelector,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  formEditProfile,
  formCard,
  cardTemplateSelector,
  cardsContainerSelector
} from '../utils/constants.js';

// валидатор формы "Редактировать профиль"
const formProfileValidator = new FormValidator(
  configValidation,
  formEditProfile
);
formProfileValidator.enableValidation();

// валидатор формы "Новое место"
const formCardValidator = new FormValidator(configValidation, formCard);
formCardValidator.enableValidation();

// редактирование профиля
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job'
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
const handleSubmitProfile = (data) => {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
};

// обработчик добавления карточки
const handleAddCard = () => {
  formCardValidator.resetValidation();
  popupAddCard.open();
};

// обработчик submit карточки
const handleSubmitCard = ({place: name, link}) => {
  renderCard({name, link});
  popupAddCard.close();
};

// обработчик клика по картинке карточки (открыть)
const handleCardClick = (cardImageSrc, cardImageAlt) => {
  popupCardImage.open(cardImageSrc, cardImageAlt);
};

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
const cardsList = new Section({
  items: initialCards,
  renderer: renderCard
}, cardsContainerSelector);

cardsList.renderItems();

// слушатель клика по кнопке редактировать профиль (открыть)
buttonOpenEditProfilePopup.addEventListener('click', handleEditProfile);

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
