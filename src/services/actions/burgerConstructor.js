import { api } from '../../utils/Api';

export const GET_BURGER_CONSTRUCTOR_REQUEST = 'GET_BURGER_CONSTRUCTOR_REQUEST';
export const GET_BURGER_CONSTRUCTOR_SUCCESS = 'GET_BURGER_CONSTRUCTOR_SUCCESS';
export const GET_BURGER_CONSTRUCTOR_FAILED = 'GET_BURGER_CONSTRUCTOR_FAILED';

export const ADD_BURGER_CONSTRUCTOR_ITEM = 'ADD_BURGER_CONSTRUCTOR_ITEM';
export const ADD_BUN_FAILED = 'ADD_BUN_FAILED'


export function getConstructorData(array) {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_CONSTRUCTOR_REQUEST,
    });
    api.sendOrder(array)
      .then((data) => {
        dispatch({
          type: GET_BURGER_CONSTRUCTOR_SUCCESS,
          orderData: data,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_BURGER_CONSTRUCTOR_FAILED,
        });
      });
  }
}

export function addConstructorItem(item) {
  if (item.type === 'bun') {
    return ({
      type: ADD_BUN_FAILED,
    });
  } else {
    return ({
      type: ADD_BURGER_CONSTRUCTOR_ITEM,
      burgerConstructorArray: item,
    });
  }
}

// export const moveConstructorItem = (item) => {
//   return ({
//     type: GET_BURGER_CONSTRUCTOR_ADD_ITEM,
//     id: item.id,
//     ingType: item.type,
//     item: item.ing,
//   });
// };