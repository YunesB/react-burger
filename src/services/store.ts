import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import { rootReducer } from "./reducers";
import { socketMiddleware } from './middlewares/socketMiddleware';
import { socketAuthMiddleware } from "./middlewares/socketAuthMiddleware";

import { WSS_URL } from "../utils/constants";

export type RootState = ReturnType<typeof store.getState>;

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    socketMiddleware(`${WSS_URL}/orders/all`),
    socketAuthMiddleware(`${WSS_URL}/orders`),
    thunk
  )
));