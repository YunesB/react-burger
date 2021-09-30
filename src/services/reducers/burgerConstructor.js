import {
  GET_BURGER_CONSTRUCTOR_REQUEST,
  GET_BURGER_CONSTRUCTOR_SUCCESS,
  GET_BURGER_CONSTRUCTOR_FAILED,
  ADD_BURGER_CONSTRUCTOR_ITEM,
  ADD_BUN_FAILED,
  MOVE_BURGER_CONSTRUCTOR_ITEM,
  DELETE_BURGER_CONSTRUCTOR_ITEM,
  RESET_BURGER_CONSTRUCTOR
} from "../actions/burgerConstructor.js";

import { DEFAULT_ORDER } from '../../utils/constants';

const initialState = {
  burgerConstructorArray: [],
  burgerConstructorRequest: false,
  burgerConstructorFailed: false,

  orderData: DEFAULT_ORDER,
  isPageLoading: false,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BURGER_CONSTRUCTOR_REQUEST: {
      return {
        ...state,
        burgerConstructorRequest: true,
        isPageLoading: true,
      };
    }
    case GET_BURGER_CONSTRUCTOR_SUCCESS: {
      return {
        ...state,
        burgerConstructorRequest: false,
        burgerConstructorFailed: false,
        orderData: action.orderData,
        isPageLoading: false,
      };
    }
    case GET_BURGER_CONSTRUCTOR_FAILED: {
      return {
        ...state,
        burgerConstructorRequest: false,
        burgerConstructorFailed: true,
        isPageLoading: false,
      };
    }
    case ADD_BURGER_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        burgerConstructorArray: [
          ...state.burgerConstructorArray, 
          action.burgerConstructorArray
        ],
      };
    }
    case ADD_BUN_FAILED: {
      return state;
    }
    case MOVE_BURGER_CONSTRUCTOR_ITEM: {
      const array = [...state.burgerConstructorArray];

      const dragItem = array[action.dragIndex];
      const hoveredItem = array[action.hoverIndex];

      array[action.hoverIndex] = dragItem;
      array[action.dragIndex] = hoveredItem;
     
      return {
        ...state,
        burgerConstructorArray: array,
      };
    }
    case DELETE_BURGER_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        burgerConstructorArray: [
          ...state.burgerConstructorArray,
        ].filter((item, index) => {
          return index !== action.index;
        }),
      };
    }
    case RESET_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        burgerConstructorArray: action.burgerConstructorArray,
      }
    }
    default: {
      return state;
    }
  }
};