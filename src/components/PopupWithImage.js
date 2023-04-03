import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._place = this._popup.querySelector('.popup__place');
  }

  open(cardImageSrc, cardImageAlt) {
    
    this._image.src = cardImageSrc;
    this._image.alt = cardImageAlt;
    this._place.textContent = cardImageAlt;

    super.open();
  }
}