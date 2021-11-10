import { api } from '../../utils/Api';
import { v4 as uuidv4 } from 'uuid';
import { TBasketCard, TOrderData, TOrderArray } from '../../types/index';

export const GET_BURGER_CONSTRUCTOR_REQUEST: 'GET_BURGER_CONSTRUCTOR_REQUEST' = 'GET_BURGER_CONSTRUCTOR_REQUEST';
export const GET_BURGER_CONSTRUCTOR_SUCCESS: 'GET_BURGER_CONSTRUCTOR_SUCCESS' = 'GET_BURGER_CONSTRUCTOR_SUCCESS';
export const GET_BURGER_CONSTRUCTOR_FAILED: 'GET_BURGER_CONSTRUCTOR_FAILED' = 'GET_BURGER_CONSTRUCTOR_FAILED';

export const ADD_BURGER_CONSTRUCTOR_ITEM: 'ADD_BURGER_CONSTRUCTOR_ITEM' = 'ADD_BURGER_CONSTRUCTOR_ITEM';
export const ADD_BUN_FAILED: 'ADD_BUN_FAILED' = 'ADD_BUN_FAILED';

export const MOVE_BURGER_CONSTRUCTOR_ITEM: 'MOVE_BURGER_CONSTRUCTOR_ITEM' = 'MOVE_BURGER_CONSTRUCTOR_ITEM';
export const DELETE_BURGER_CONSTRUCTOR_ITEM: 'DELETE_BURGER_CONSTRUCTOR_ITEM' = 'DELETE_BURGER_CONSTRUCTOR_ITEM';

export const RESET_BURGER_CONSTRUCTOR: 'RESET_BURGER_CONSTRUCTOR' = 'RESET_BURGER_CONSTRUCTOR';

export interface IGetBurgerConstructorRequestAction {
  readonly type: typeof GET_BURGER_CONSTRUCTOR_REQUEST;
}

export interface IGetBurgerConstructorSuccessAction {
  readonly type: typeof GET_BURGER_CONSTRUCTOR_SUCCESS;
  readonly orderData: TOrderData;
}

export interface IGetBurgerConstructorFailedAction {
  readonly type: typeof GET_BURGER_CONSTRUCTOR_FAILED;
}

export interface IAddBurgerConstructorItem {
  readonly type: typeof ADD_BURGER_CONSTRUCTOR_ITEM;
  burgerConstructorArray: TBasketCard;
}

export interface IAddBunFailed {
  readonly type: typeof ADD_BUN_FAILED;
}

export interface IMoveBurgerConstructorItem {
  readonly type: typeof MOVE_BURGER_CONSTRUCTOR_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IDeleteBurgerConstructorItem {
  readonly type: typeof DELETE_BURGER_CONSTRUCTOR_ITEM;
  readonly index: number;
}

export interface IResetBurgerConstructor {
  readonly type: typeof RESET_BURGER_CONSTRUCTOR;
  burgerConstructorArray: Array<TBasketCard>;
}

export type TBurgerConstructorActions = 
| IGetBurgerConstructorRequestAction 
| IGetBurgerConstructorSuccessAction 
| IGetBurgerConstructorFailedAction 
| IAddBurgerConstructorItem 
| IAddBunFailed 
| IMoveBurgerConstructorItem 
| IDeleteBurgerConstructorItem 
| IResetBurgerConstructor;

export function getConstructorData(array: TOrderArray) {
  return function (dispatch: any) {
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

export function addConstructorItem(item: TBasketCard) {
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

export function moveConstructorItem(item: number, index: number) {
  return({
    type: MOVE_BURGER_CONSTRUCTOR_ITEM,
    dragIndex: item,
    hoverIndex: index
  });
}

export function deleteConstructorItem(index: number) {
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