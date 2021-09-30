import { api } from '../../utils/Api';
import { v4 as uuidv4 } from 'uuid';

export const GET_BURGER_CONSTRUCTOR_REQUEST = 'GET_BURGER_CONSTRUCTOR_REQUEST';
export const GET_BURGER_CONSTRUCTOR_SUCCESS = 'GET_BURGER_CONSTRUCTOR_SUCCESS';
export const GET_BURGER_CONSTRUCTOR_FAILED = 'GET_BURGER_CONSTRUCTOR_FAILED';

export const ADD_BURGER_CONSTRUCTOR_ITEM = 'ADD_BURGER_CONSTRUCTOR_ITEM';
export const ADD_BUN_FAILED = 'ADD_BUN_FAILED';

export const MOVE_BURGER_CONSTRUCTOR_ITEM = 'MOVE_BURGER_CONSTRUCTOR_ITEM';
export const DELETE_BURGER_CONSTRUCTOR_ITEM = 'DELETE_BURGER_CONSTRUCTOR_ITEM';

export const RESET_BURGER_CONSTRUCTOR = 'RESET_BURGER_CONSTRUCTOR';


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
      })
      .finally(() => {
        dispatch({
          type: RESET_BURGER_CONSTRUCTOR, 
          burgerConstructorArray: [],
        })
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
      burgerConstructorArray: {...item, key: uuidv4()}
    });
  }
}

export function moveConstructorItem(item, index) {
  return({
    type: MOVE_BURGER_CONSTRUCTOR_ITEM,
    dragIndex: item,
    hoverIndex: index
  });
}

export function deleteConstructorItem(index) {
  return({
    type: DELETE_BURGER_CONSTRUCTOR_ITEM, 
    index: index
  })
}

export function resetConstructorArray() {
  return({
    type: RESET_BURGER_CONSTRUCTOR, 
    burgerConstructorArray: [],
  })
}