import { combineReducers } from "redux";

import { burgerIngredientsReducer } from "./burgerIngredients.js";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
});