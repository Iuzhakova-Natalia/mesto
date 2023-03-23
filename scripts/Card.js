class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  // поставить лайк
  _handleLike() {
    this._buttonLike.classList.toggle("card__like_active");
  }

  // удалить карточку
  _handleDelete() {
    this._buttonDelete.closest(".card").remove();
  }
  // установить слушатели по клику на лайк, корзину, картинку
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLike();
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDelete();
    });

    this._cardImage.addEventListener("click", () => {
      this._openImagePopup(this._name, this._link);
    });
  }
  // заполнить шаблон карточки данными, добавить слушатели
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardName = this._element.querySelector(".card__name");
    this._buttonLike = this._element.querySelector(".card__like");
    this._buttonDelete = this._element.querySelector(".card__delete");

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    return this._element;
  }
}

export default Card;
