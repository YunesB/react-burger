export const WS_AUTH_CONNECTION_START: "WS_AUTH_CONNECTION_START" = "WS_AUTH_CONNECTION_START";
export const WS_AUTH_CONNECTION_SUCCESS: "WS_AUTH_CONNECTION_SUCCESS" =
  "WS_AUTH_CONNECTION_SUCCESS";
export const WS_AUTH_CONNECTION_ERROR: "WS_AUTH_CONNECTION_ERROR" = "WS_AUTH_CONNECTION_ERROR";
export const WS_AUTH_CONNECTION_CLOSED: "WS_AUTH_CONNECTION_CLOSED" =
  "WS_AUTH_CONNECTION_CLOSED";
export const WS_AUTH_GET_MESSAGE: "WS_AUTH_GET_MESSAGE" = "WS_AUTH_GET_MESSAGE";
export const WS_AUTH_SEND_MESSAGE: "WS_AUTH_SEND_MESSAGE" = "WS_AUTH_SEND_MESSAGE";

export interface WsAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}

export interface WsAuthConnectionSuccessAction {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

export interface WsAuthConnectionErrorAction {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
  readonly payload: any;
}

export interface WsAuthConnectionClosedAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

export interface WsAuthConnectionGetMessageAction {
  readonly type: typeof WS_AUTH_GET_MESSAGE;
  readonly payload: any;
}

export interface WsAuthConnectionSendMessageAction {
  readonly type: typeof WS_AUTH_SEND_MESSAGE;
}

export type TWsAuthActions =
  | WsAuthConnectionStartAction
  | WsAuthConnectionSuccessAction
  | WsAuthConnectionErrorAction
  | WsAuthConnectionClosedAction
  | WsAuthConnectionGetMessageAction
  | WsAuthConnectionSendMessageAction


  export const wsAuthConnectionStart = () => ({
    type: WS_AUTH_CONNECTION_START,
  });

  export const wsAuthConnectionClose = () => ({
    type: WS_AUTH_CONNECTION_CLOSED,
  })