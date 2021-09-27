import { combineReducers } from "redux";

import { burgerIngredientsReducer } from "./burgerIngredients.js";
import { burgerConstructorReducer } from "./burgerConstructor.js";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer
});