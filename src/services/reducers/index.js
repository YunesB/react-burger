import { combineReducers } from "redux";

import { burgerIngredientsReducer } from "./burgerIngredients.js";
import { burgerConstructorReducer } from "./burgerConstructor.js";
import { currentSessionReducer } from "./currentSession.js";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentSession: currentSessionReducer,
});