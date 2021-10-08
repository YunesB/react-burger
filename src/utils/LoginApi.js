import * as CONSTANTS from './constants';

class LoginApi {
  constructor({ address }) {
    this._address = address;
    this._token = localStorage.getItem('accessToken');
    this._refreshToken = localStorage.getItem('refreshToken');
  };

  handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  };

  updateToken() {
    if (!this._refreshToken) {
      return
    }
    return fetch(`${this._address}/auth/token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: this._refreshToken}),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  }

  register(data) {
    return fetch(`${this._address}/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  };

  signIn(data) {
    return fetch(`${this._address}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  };

  signOut() {
    if (!this._refreshToken) {
      return
    }
    return fetch(`${this._address}/auth/logout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: this._refreshToken}),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  }

  resetPassword(email) {
    return fetch(`${this._address}/password-reset`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  };

  updatePassword(data) {
    return fetch(`${this._address}/password-reset/reset`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  };

  getUserInfo() {
    return fetch(`${this._address}/auth/user`, {
      method: "GET",
      headers: {
        'Authorization': this._token,
        'Content-Type': 'application/json',
      }
    })
    .then((res) =>
        this.handleResponse(res)
    )
  }

  setUserInfo(data) {
    return fetch(`${this._address}/auth/user`, {
      method: "POST",
      headers: {
        'Authorization': this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  }
};

export const loginApi = new LoginApi({
  address: CONSTANTS.BASE_URL,
});