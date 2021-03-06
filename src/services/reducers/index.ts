import { combineReducers } from "redux";

import { burgerIngredientsReducer } from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { currentSessionReducer } from "./currentSession";
import { orderFeedReducer } from './orderFeed';
import { userOrderFeedReducer } from "./userOrderFeed";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentSession: currentSessionReducer,
  orderFeed: orderFeedReducer,
  userOrderFeed: userOrderFeedReducer,
});