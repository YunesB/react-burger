import * as CONSTANTS from './constants';

type TOrderArray = {
  ingredients: (string | undefined)[];
}

class Api {
  private address: string;
  constructor({ address }:  {address: string}) {
    this.address = address;
  }

  handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }

  getCardsData() {
    return fetch(`${this.address}/ingredients`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) =>
      this.handleResponse(res)
    )
  };

  sendOrder(orderArray: TOrderArray) {
    return fetch(`${this.address}/orders`, {
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