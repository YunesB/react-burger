import { orderFeedReducer, initialState } from "./orderFeed";

import {  
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/wsActions";

describe("order feed reducer", () => {
  it("should return the initial state", () => {
    expect(orderFeedReducer(undefined, {})).toEqual({
      wsConnected: false,
      wsError: null,
      orderFeedData: [],
      isPageLoading: true,
    });
  });

  it("should handle WS_CONNECTION_START", () => {
    expect(
      orderFeedReducer(initialState, {
        type: WS_CONNECTION_START,
      })
    ).toEqual(
      expect.objectContaining({
        isPageLoading: true,
      })
    );
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      orderFeedReducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        wsConnected: true,
      })
    );
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      orderFeedReducer(initialState, {
        type: WS_CONNECTION_ERROR,
        payload: "Error",
      })
    ).toEqual(
      expect.objectContaining({
        wsError: "Error",
        wsConnected: false,
      })
    );
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      orderFeedReducer(initialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        wsConnected: false,
      })
    );
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      orderFeedReducer(initialState, {
        type: WS_GET_MESSAGE,
        payload: [{ order: 1 }, { order: 2 }],
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        orderFeedData: [{ order: 1 }, { order: 2 }],
        isPageLoading: false,
      })
    );
  });
});