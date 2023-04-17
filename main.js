(()=>{"use strict";class e{constructor({items:e,renderer:t},s){this._items=e,this._renderer=t,this._container=document.querySelector(s)}renderItems(){this._items.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}class t{constructor(e,t,s){this._templateSelector=t,this._name=e.name,this._link=e.link,this._handleCardClick=s}_getCardElement(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}_handleDelete(){this._card.remove(),this._card=null}_handleLike(){this._buttonLike.classList.toggle("card__like_active")}_setEventListeners(){this._buttonDelete.addEventListener("click",(()=>{this._handleDelete()})),this._buttonLike.addEventListener("click",(()=>{this._handleLike()})),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._cardImage.src,this._cardImage.alt)}))}generateCard(){return this._card=this._getCardElement(),this._cardImage=this._card.querySelector(".card__image"),this._cardName=this._card.querySelector(".card__name"),this._buttonDelete=this._card.querySelector(".card__delete"),this._buttonLike=this._card.querySelector(".card__like"),this._setEventListeners(),this._cardName.textContent=this._name,this._cardImage.alt=this._name,this._cardImage.src=this._link,this._card}}class s{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popup.addEventListener("mousedown",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-button"))&&this.close()}))}}class r extends s{constructor(e,t){super(e),this._handleSubmitForm=t,this._inputList=this._popup.querySelectorAll(".form__input-text"),this._form=this._popup.querySelector(".form")}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmitForm(this._getInputValues())}))}close(){super.close(),this._form.reset()}}class n{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}_showInputError(e){const t=this._formElement.querySelector(`.${e.id}-error`);t.textContent=e.validationMessage,t.classList.add(this._errorClass),e.classList.add(this._inputErrorClass)}_hideInputError(e){const t=this._formElement.querySelector(`.${e.id}-error`);t.textContent="",t.classList.remove(this._errorClass),e.classList.remove(this._inputErrorClass)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_disableButton(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)}_enableButton(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled")}_toggleButtonState(){this._hasInvalidInput()?this._disableButton():this._enableButton()}_setEventListeners(){this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))})),this._formElement.addEventListener("submit",(e=>{e.preventDefault()}))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}const i={inputSelector:".form__input-text",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_disabled",inputErrorClass:"form__input-text_type_error-line",errorClass:"form__input-error_active"},o=document.querySelector(".profile__button_type_edit"),a=document.querySelector(".profile__add-button"),c=document.querySelector(".profile__ava-button"),l=document.forms["form-edit-profile"],_=document.forms["form-avatar"],h=document.forms["form-add-card"],d=new class{constructor({baseUrl:e,headers:t}){this._address=e,this._headers=t}_checkResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getUserInfo(){return fetch(`${this._address}/users/me`,{method:"GET",headers:this._headers}).then(this._checkResponse)}getInitialCards(){return fetch(`${this._address}/cards`,{method:"GET",headers:this._headers}).then(this._checkResponse)}setUserInfo({name:e,job:t}){return fetch(`${this._address}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,job:t})}).then(this._checkResponse)}addCard({name:e,link:t}){return fetch(`${this._address}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-64",headers:{authorization:"a24e7087-a96b-4b2b-8905-f0302e2d2b76","Content-Type":"application/json"}}),u=new n(i,l);u.enableValidation();const p=new n(i,_);p.enableValidation();const m=new n(i,h);m.enableValidation();const v=new class{constructor({userNameSelector:e,userJobSelector:t,userAvatarSelector:s}){this._userName=document.querySelector(e),this._userJob=document.querySelector(t),this._userAvatar=document.querySelector(s)}getUserInfo(){const e={};return e.name=this._userName.textContent,e.job=this._userJob.textContent,e}setUserInfo({name:e,job:t}){this._userName.textContent=e,this._userJob.textContent=t}setUserAvatar({avatar:e}){this._userAvatar.src=e}}({userNameSelector:".profile__name",userJobSelector:".profile__job",userAvatarSelector:".profile__avatar"});d.getUserInfo().then((e=>{v.setUserInfo(e)})).catch((e=>{console.log(`Ошибка: ${e}`)})),c.addEventListener("click",(()=>{popupAvatar.open()}));const b=(e,t)=>{C.open(e,t)};let E;const f=e=>{E.addItem((e=>new t(e,"#card-template",b).generateCard())(e))};d.getInitialCards().then((t=>{(t=>{E=new e({items:t,renderer:f},".cards-container"),E.renderItems()})(t)})).catch((e=>{console.log(`Ошибка: ${e}`)})),o.addEventListener("click",(()=>{const{name:e,job:t}=v.getUserInfo();l.name.value=e,l.job.value=t,u.resetValidation(),S.open()})),c.addEventListener("click",(()=>{p.resetValidation()})),a.addEventListener("click",(()=>{m.resetValidation(),L.open()}));const S=new r(".popup_tupe_edit",(e=>{d.setUserInfo(e).then((e=>{v.setUserInfo(e),S.close()})).catch((e=>{console.log(`Ошибка: ${e}`)}))}));S.setEventListeners();const L=new r(".popup_type_new-place",(({name:e,link:t})=>{d.addCard({name:e,link:t}).then((e=>{f(e),popupFormCard.close()})).catch((e=>{console.log(`Ошибка: ${e}`)}))}));L.setEventListeners();const C=new class extends s{constructor(e){super(e),this._image=this._popup.querySelector(".popup__image"),this._place=this._popup.querySelector(".popup__place")}open(e,t){this._image.src=e,this._image.alt=t,this._place.textContent=t,super.open()}}(".popup_type_image");C.setEventListeners()})();