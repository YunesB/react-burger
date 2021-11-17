import { Middleware } from "redux";
import { RootState } from "../store";

import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
  WS_AUTH_SEND_MESSAGE,
} from '../actions/wsAuthActions';

export const socketAuthMiddleware: any = (WSS_URL: string): Middleware<{}, RootState> => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_AUTH_CONNECTION_START) {
        const accessToken = localStorage.getItem("accessToken");
        const correctedToken = accessToken!.replace('Bearer ',''); 
        socket = new WebSocket(`${WSS_URL}?token=${correctedToken}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_AUTH_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: WS_AUTH_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type:  WS_AUTH_GET_MESSAGE, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: WS_AUTH_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_AUTH_SEND_MESSAGE) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};