import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED,
  GET_SELECTED_BUN,
  GET_SELECTED_INGREDIENT,

  TBurgerIngredientsActions
} from "../actions/burgerIngredients";

import { DEFAULT_BUN, DEFAULT_ING } from '../../utils/constants';
import { TBasketCard } from '../../types';

type TBurgerIngredientsState = {
  burgerIngredientsArray: Array<TBasketCard>,
  burgerIngredientsRequest: boolean,
  burgerIngredientsFailed: boolean,

  selectedBun: TBasketCard,
  selectedIngredient: TBasketCard,
  isPageLoading: boolean,
} 

const initialState: TBurgerIngredientsState = {
  burgerIngredientsArray: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,

  selectedBun: DEFAULT_BUN,
  selectedIngredient: DEFAULT_ING,
  isPageLoading: true,
};

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredientsState => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        burgerIngredientsRequest: true,
      };
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        burgerIngredientsArray: action.burgerIngredientsArray,
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: false,
        isPageLoading: false,
      };
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        burgerIngredientsFailed: true,
        burgerIngredientsRequest: false,
      };
    }
    case GET_SELECTED_BUN: {
      return {
        ...state,
        selectedBun: action.selectedBun
      }
    }
    case GET_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.selectedIngredient
      }
    }
    default: {
      return state;
    }
  }
};