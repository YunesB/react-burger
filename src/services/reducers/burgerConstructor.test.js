import { DEFAULT_ORDER } from '../../utils/constants';
import { burgerConstructorReducer, initialState } from "./burgerConstructor";

import {
  GET_BURGER_CONSTRUCTOR_REQUEST,
  GET_BURGER_CONSTRUCTOR_SUCCESS,
  GET_BURGER_CONSTRUCTOR_FAILED,
  ADD_BURGER_CONSTRUCTOR_ITEM,
  MOVE_BURGER_CONSTRUCTOR_ITEM,
  DELETE_BURGER_CONSTRUCTOR_ITEM,
  RESET_BURGER_CONSTRUCTOR,
} from "../actions/burgerConstructor";

describe("burger constructor reducer", () => {
  it("should return the initial state", () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual({
      burgerConstructorArray: [],
      burgerConstructorRequest: false,
      burgerConstructorFailed: false,
    
      orderData: DEFAULT_ORDER,
      isPageLoading: false,
    });
  });

  it("should handle GET_BURGER_CONSTRUCTOR_REQUEST", () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: GET_BURGER_CONSTRUCTOR_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        burgerConstructorRequest: true,
        isPageLoading: true,
      })
    );
  });

  it("should handle GET_BURGER_CONSTRUCTOR_SUCCESS", () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: GET_BURGER_CONSTRUCTOR_SUCCESS,
        orderData: [{ ingredient: 0 }],
      })
    ).toEqual(
      expect.objectContaining({
        burgerConstructorRequest: false,
        burgerConstructorFailed: false,
        orderData: [{ ingredient: 0 }],
        isPageLoading: false,
      })
    );
  });

  it("should handle GET_BURGER_CONSTRUCTOR_FAILED", () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: GET_BURGER_CONSTRUCTOR_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        burgerConstructorRequest: false,
        burgerConstructorFailed: true,
        isPageLoading: false,
      })
    );
  });

  it("should handle ADD_BURGER_CONSTRUCTOR_ITEM", () => {
    expect(
      burgerConstructorReducer(initialState, {
        type:  ADD_BURGER_CONSTRUCTOR_ITEM,
        burgerConstructorArray: { ingredient: 0, _id: 0 },
      })
    ).toEqual(
      expect.objectContaining({
        burgerConstructorArray: [
          { ingredient: 0, _id: 0 }
        ],
      })
    );
  });

  it("should handle MOVE_BURGER_CONSTRUCTOR_ITEM", () => {
    expect(
      burgerConstructorReducer(
        {
          burgerConstructorArray: [
            { ingredient: 0, _id: 0 },
            { ingredient: 1, _id: 1 },
          ],
        },
        {
          type: MOVE_BURGER_CONSTRUCTOR_ITEM,
          dragIndex: 0,
          hoverIndex: 1
        }
      )
    ).toEqual(
      {
        burgerConstructorArray: [
          { ingredient: 1, _id: 1 },
          { ingredient: 0, _id: 0 },
        ],
      }
    );
  });

  it("should handle DELETE_BURGER_CONSTRUCTOR_ITEM", () => {
    expect(
      burgerConstructorReducer(
        {
          burgerConstructorArray: [
            { ingredient: 0, _id: 0 },
            { ingredient: 1, _id: 1 },
          ],
        },
        {
          type: DELETE_BURGER_CONSTRUCTOR_ITEM,
          index: 0,
        }
      )).toEqual({
        burgerConstructorArray: [{ ingredient: 1, _id: 1 }],
      });
  });

  it("should handle RESET_BURGER_CONSTRUCTOR", () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: RESET_BURGER_CONSTRUCTOR,
        burgerConstructorArray: []
      })
    ).toEqual(
      expect.objectContaining({
        burgerConstructorArray: []
      })
    );
  });
});