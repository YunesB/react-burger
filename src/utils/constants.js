import loading from '../images/loading.svg';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const DEFAULT_ORDER = {
  name: "DEFAULT_ORDER",
  order: {
      number: 9999
  },
  success: true
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
  _id: '0',
}

export const DEFAULT_ING = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: loading,
  image_large: loading,
  image_mobile: loading,
  name: "Какой-то ингридиент",
  price: 0,
  proteins: 0,
  type: "main",
  __v: 0,
  _id: '0',
}

export const DEFAULT_USER = {
  user: {
    email: "burger-lover@stellar-burgers.com",
    name: "Норма"
  }
}