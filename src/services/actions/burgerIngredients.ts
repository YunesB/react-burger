import { api } from '../../utils/Api';
import { TBasketCard, AppThunk } from '../../types';

export const GET_BURGER_INGREDIENTS_REQUEST: 'GET_BURGER_INGREDIENTS_REQUEST' = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS: 'GET_BURGER_INGREDIENTS_SUCCESS' = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED: 'GET_BURGER_INGREDIENTS_FAILED' = 'GET_BURGER_INGREDIENTS_FAILED';

export const GET_SELECTED_BUN: 'GET_SELECTED_BUN' = 'GET_SELECTED_BUN';
export const GET_SELECTED_INGREDIENT: 'GET_SELECTED_INGREDIENT' = 'GET_SELECTED_INGREDIENT';

export interface IGetBurgerIngredientRequestAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}

export interface IGetBurgerIngredientSuccessAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
  readonly burgerIngredientsArray: Array<TBasketCard>
}

export interface IGetBurgerIngredientFailedAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_FAILED;
}

export interface IGetSelectedBun {
  readonly type: typeof GET_SELECTED_BUN;
  readonly selectedBun: TBasketCard;
}

export interface IGetSelectedIngredient {
  readonly type: typeof GET_SELECTED_INGREDIENT;
  readonly selectedIngredient: TBasketCard;
}

export type TBurgerIngredientsActions = 
| IGetBurgerIngredientRequestAction
| IGetBurgerIngredientSuccessAction
| IGetBurgerIngredientFailedAction
| IGetSelectedBun
| IGetSelectedIngredient

export function getIngredientsData() {
  return function (dispatch: AppThunk) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });
    api.getCardsData()
      .then((res: any) => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: GET_BURGER_INGREDIENTS_SUCCESS,
            burgerIngredientsArray: res.data,
          });
        } else {
          dispatch({
            type: GET_BURGER_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED,
        });
      })
    };
}

export function setSelectedBun(bun: TBasketCard) {
  return ({
    type: GET_SELECTED_BUN,
    selectedBun: bun,
  });
}

export function setSelectedIngredient(ingr: TBasketCard) {
  return ({
    type: GET_SELECTED_INGREDIENT,
    selectedIngredient: ingr,
  });
}