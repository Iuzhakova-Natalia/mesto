export default class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
      this._userName = document.querySelector(userNameSelector);
      this._userJob = document.querySelector(userJobSelector);
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
  }