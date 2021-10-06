import loading from '../images/loading.svg';

export const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
export const RESET_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset';

export const DEFAULT_ORDER = {
  "name": "DEFAULT_ORDER",
  "order": {
      "number": 9999
  },
  "success": true
};

export const DEFAULT_BUN = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: loading,
  image_large: loading,
  image_mobile: loading,
  name: "Перетяните булочку сюда",
  price: 0,
  proteins: 0,
  type: "bun",
  __v: 0,
  _id: 0,
}