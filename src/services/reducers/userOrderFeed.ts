import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
  WS_AUTH_CONNECTION_START,
} from "../actions/wsAuthActions";

import { TWsAuthActions } from "../actions/wsAuthActions";
import { TFeedState } from "../../types";

export const initialState: TFeedState = {
  wsConnected: false,
  wsError: null,
  orderFeedData: [],
  isPageLoading: true,
};

export const userOrderFeedReducer = (state = initialState, action: TWsAuthActions) => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_START:
      return {
        isPageLoading: true,
      };
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: null,
        wsConnected: true,
      };

    case WS_AUTH_CONNECTION_ERROR:
      console.log(action.payload);
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false,
      };

    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: null,
        wsConnected: false,
      };

    case WS_AUTH_GET_MESSAGE:
      return {
        ...state,
        wsError: null,
        orderFeedData: action.payload,
        isPageLoading: false,
      };
    default:
      return state;
  }
};