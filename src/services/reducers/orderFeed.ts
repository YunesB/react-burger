import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from "../actions/wsActions";

import { TWsActions } from "../actions/wsActions";
// import { TFeedData } from "../../types/feed";

type TFeedState = {
  wsConnected?: boolean;
  wsError?: any;
  orderFeedData?: any;
};

export const initialState: TFeedState = {
  wsConnected: false,
  wsError: null,
  orderFeedData: undefined,
};

export const orderFeedReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {};
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: null,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      console.log(action.payload);
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: null,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        wsError: null,
        orderFeedData: action.payload,
      };
    default:
      return state;
  }
};