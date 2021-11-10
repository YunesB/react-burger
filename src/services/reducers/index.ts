import { combineReducers } from "redux";

import { burgerIngredientsReducer } from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { currentSessionReducer } from "./currentSession";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentSession: currentSessionReducer,
});