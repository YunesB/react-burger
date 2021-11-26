import { burgerIngredientsReducer, initialState } from "./burgerIngredients";
import { DEFAULT_BUN, DEFAULT_ING } from '../../utils/constants';

import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED,
  GET_SELECTED_BUN,
  GET_SELECTED_INGREDIENT,
} from "../actions/burgerIngredients";

describe("burger ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({
      burgerIngredientsArray: [],
      burgerIngredientsRequest: false,
      burgerIngredientsFailed: false,
    
      selectedBun: DEFAULT_BUN,
      selectedIngredient: DEFAULT_ING,
      isPageLoading: true,
    });
  });

  it("should handle GET_BURGER_INGREDIENTS_REQUEST", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_BURGER_INGREDIENTS_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        burgerIngredientsRequest: true,
      })
    );
  });

  it("should handle GET_BURGER_INGREDIENTS_SUCCESS", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        burgerIngredientsArray: [{ ingridient: 0 }],
      })
    ).toEqual(
      expect.objectContaining({
        burgerIngredientsArray: [{ ingridient: 0 }],
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: false,
        isPageLoading: false,
      })
    );
  });

  it("should handle GET_BURGER_INGREDIENTS_FAILED", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_BURGER_INGREDIENTS_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        burgerIngredientsFailed: true,
        burgerIngredientsRequest: false,
      })
    );
  });

  it("should handle GET_SELECTED_BUN", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_SELECTED_BUN,
        selectedBun: {name: "test_bun", id: 0}
      })
    ).toEqual(
      expect.objectContaining({
        selectedBun: {name: "test_bun", id: 0}
      })
    );
  });

  it("should handle GET_SELECTED_INGREDIENT", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_SELECTED_INGREDIENT,
        selectedIngredient: {name: "test_ing", id: 0}
      })
    ).toEqual(
      expect.objectContaining({
        selectedIngredient: {name: "test_ing", id: 0}
      })
    );
  });
});
