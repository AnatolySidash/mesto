export class UserInfo {
  constructor({ userNameSelector, userDataSelector, userAvatar, userId }) {
    this._userName = userNameSelector;
    this._userJobTitle = userDataSelector;
    this._userAvatar = userAvatar;
    this.userId = userId;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJobTitle.textContent,
      userAvatar: this._userAvatar.src,
      userId: this.userId
    };
  }

  setUserInfo({ userName, userJob, userAvatar, userId }) {
    this._userName.textContent = userName;
    this._userJobTitle.textContent = userJob;
    this._userAvatar.src = userAvatar;
    this.userId = userId;
  }
}
