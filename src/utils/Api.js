import * as CONSTANTS from './constants';

class Api {
  constructor({ address, postAddress, resetPasswordAddress }) {
    this._address = address;
    this._postAddress = postAddress;
    this._resetPasswordAddress = resetPasswordAddress;
  }

  handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }

  getCardsData() {
    return fetch(`${this._address}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) =>
        this.handleResponse(res)
    )
  };

  sendOrder(orderArray) {
    return fetch(`${this._postAddress}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderArray),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  };

  resetPassword(email) {
    return fetch(`${this._resetPasswordAddress}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email),
    })
    .then((res) =>
        this.handleResponse(res)
    )
  }
};

export const api = new Api({
  address: CONSTANTS.BASE_URL,
  postAddress: CONSTANTS.ORDER_URL,
  resetPasswordAddress: CONSTANTS.RESET_PASSWORD_URL,
});