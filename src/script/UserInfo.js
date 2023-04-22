export class UserInfo {
  constructor({ userNameSelector, userDataSelector }) {
    this._userName = userNameSelector;
    this._userJobTitle = userDataSelector;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJobTitle.textContent
    };
  }

  setUserInfo({ userName, userJob }) {
    this._userName.textContent = userName;
    this._userJobTitle.textContent = userJob;
  }
}
