export default class UserInfo {
    constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
      this._userName = document.querySelector(userNameSelector);
      this._userJob = document.querySelector(userJobSelector);
      this._userAvatar = document.querySelector(userAvatarSelector);
    }
  
    getUserInfo() {
      const userInfo = {};
      userInfo['name'] = this._userName.textContent;
      userInfo['job'] = this._userJob.textContent;
      return userInfo;
    }
  
    setUserInfo({ name, job }) {
      this._userName.textContent = name;
      this._userJob.textContent = job;
    }

   /* setUserAvatar({ avatar }) {
      this._userAvatar.src = avatar;
    }*/
  }