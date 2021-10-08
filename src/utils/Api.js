import * as CONSTANTS from './constants';

class Api {
  constructor({ address }) {
    this._address = address;
  }

  handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }

  getCardsData() {
    return fetch(`${this._address}/ingredients`, {
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
    return fetch(`${this._address}/orders`, {
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
};

export const api = new Api({
  address: CONSTANTS.BASE_URL,
});