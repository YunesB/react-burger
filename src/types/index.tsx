import { store, RootState } from '../services/store';
import { Location } from 'history';

import { TBurgerIngredientsActions } from '../services/actions/burgerIngredients';
import { TBurgerConstructorActions } from '../services/actions/burgerConstructor'; 
import { TCurrentSessionAction } from '../services/actions/currentSession';

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TWsActions } from '../services/actions/wsActions';

export type TApplicationActions = 
| TCurrentSessionAction 
| TBurgerIngredientsActions 
| TBurgerConstructorActions
| TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch;

export type TUser = {
  user: {
    email: string,
    name: string
  }
};

export type TLocationState = {
  from?: Location;
  background?: Location;
};

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
};

export type TOrderData = {
  name: string,
  order: {
      number: number
  },
  success: boolean;
};

export type TOrderArray = {
  ingredients: (string | undefined)[];
};

export type TUserData = {
  name?: string;
  email: string;
  password?: string;
};

export type TResetPassword = {
  password: string;
  token: string;
};