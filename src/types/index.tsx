import { store } from '../index';

import { TBurgerIngredientsActions } from '../services/actions/burgerIngredients';
import { TBurgerConstructorActions } from '../services/actions/burgerConstructor'; 
import { TCurrentSessionAction } from '../services/actions/currentSession';

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
 
export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = 
| TCurrentSessionAction 
| TBurgerIngredientsActions 
| TBurgerConstructorActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch;

export type TUser = {
  user: {
    email: string,
    name: string
  }
}

export type TBasketCard = {
  calories?: number;
  carbohydrates?: number;
  fat?: number;
  image?: string;
  image_large?: string;
  image_mobile?: string;
  key?: string;
  name?: string;
  price?: number;
  proteins?: number;
  type?: string;
  __v?: number;
  _id?: string;
}

export type TOrderData = {
  name: string,
  order: {
      number: number
  },
  success: boolean;
}

export type TOrderArray = {
  ingredients: (string | undefined)[];
}

export type TUserData = {
  name?: string;
  email: string;
  password?: string;
}

export type TResetPassword = {
  password: string;
  token: string;
}