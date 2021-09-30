import { api } from '../../utils/Api';

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';

export const GET_SELECTED_BUN = 'GET_SELECTED_BUN';
export const GET_SELECTED_INGREDIENT = 'GET_SELECTED_INGREDIENT';

export function getIngredientsData() {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });
    api.getCardsData()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_BURGER_INGREDIENTS_SUCCESS,
            burgerIngredientsArray: res.data,
          });
        } else {
          dispatch({
            type: GET_BURGER_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED,
        });
      })
    };
}

export function setSelectedBun(bun) {
  return ({
    type: GET_SELECTED_BUN,
    selectedBun: bun,
  });
}

export function setSelectedIngredient(ingr) {
  return ({
    type: GET_SELECTED_INGREDIENT,
    selectedIngredient: ingr,
  });
}