import * as CONSTANTS from './constants';

class LoginApi {
  constructor({ address }) {
    this._address = address;
  };

  handleResponse(res) {
    if (res.status === 403) {
      let refreshToken = localStorage.getItem('refreshToken')
      this.updateToken(refreshToken)
        .then((data) => {
          localStorage.setItem('accessToken', data.accessToken);
        })
        .catch(() => {
          return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        })
    } else if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  };

  updateToken(refreshToken) {
    if (!refreshToken) {
      console.log('refresh token is missing');
    } else {
      return fetch(`${this._address}/auth/token`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: refreshToken}),
      })
      .then((res) =>
        this.handleResponse(res)
      )
    }
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

  signOut(refreshToken) {
    return fetch(`${this._address}/auth/logout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: refreshToken}),
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

  getUserInfo(accessToken) {
    return fetch(`${this._address}/auth/user`, {
      method: "GET",
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      return this.handleResponse(res)
    })
  }

  setUserInfo(data, accessToken) {
    return fetch(`${this._address}/auth/user`, {
      method: "PATCH",
      headers: {
        'Authorization': accessToken,
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