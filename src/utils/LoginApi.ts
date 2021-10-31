import * as CONSTANTS from './constants';

type TUserData = {
  name?: string;
  email: string;
  password?: string;
}

class LoginApi {
  private address: string;
  constructor({ address }:  {address: string}) {
    this.address = address;
  }

  handleResponse<T>(res: Response): Promise<T> {
    if (res.status === 403) {
      let refreshToken = localStorage.getItem('refreshToken')
      this.updateToken(refreshToken)!
        .then((data: unknown | any) => {
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

  updateToken(refreshToken: string | null) {
    if (!refreshToken) {
      console.log('refresh token is missing');
    } else {
      return fetch(`${this.address}/auth/token`, {
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

  register(data: TUserData) {
    return fetch(`${this.address}/auth/register`, {
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

  signIn(data: TUserData) {
    return fetch(`${this.address}/auth/login`, {
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

  signOut(refreshToken: string) {
    return fetch(`${this.address}/auth/logout`, {
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

  resetPassword(email: string) {
    return fetch(`${this.address}/password-reset`, {
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

  updatePassword(data: any) {
    console.log(data);
    return fetch(`${this.address}/password-reset/reset`, {
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

  getUserInfo(accessToken: string) {
    return fetch(`${this.address}/auth/user`, {
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

  setUserInfo(data: TUserData, accessToken: string) {
    return fetch(`${this.address}/auth/user`, {
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