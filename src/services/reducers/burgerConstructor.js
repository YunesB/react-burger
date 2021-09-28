import {
  GET_BURGER_CONSTRUCTOR_REQUEST,
  GET_BURGER_CONSTRUCTOR_SUCCESS,
  GET_BURGER_CONSTRUCTOR_FAILED,
  ADD_BURGER_CONSTRUCTOR_ITEM,
  ADD_BUN_FAILED,
  MOVE_CONSTRUCTOR_ITEM
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
    // case MOVE_CONSTRUCTOR_ITEM: {
    //   const array = [...state.burgerConstructorArray];

    //   const draggedItem = array[action.dragIndex];
    //   const replacedItem = array[action.replacedIndex];

    //   array[action.replacedIndex] = draggedItem;
    //   array[action.dragIndex] = replacedItem;
     

    //   return {
    //     ...state,
    //     burgerConstructorIngridients: array,
    //   };
    // }
    default: {
      return state;
    }
  }
};