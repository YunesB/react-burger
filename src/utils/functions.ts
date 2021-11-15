import { TBasketCard } from "../types";
import { isToday, format, isYesterday } from 'date-fns';

export const getIngr = (array: any, burgerIngredientsArray: any) => {
  let Ingr: Array<TBasketCard> = [];
  array.ingredients.map((id: string) => {
    return burgerIngredientsArray.forEach((item: TBasketCard) => {
      if (item._id === id) {
        Ingr.push(item!);
      }
    });
  });
  return Ingr;
};

export const getTotalPrice = (array: any) => {
  let totalSum = 0;
  let ingrPrices: Array<number> = [];
  array.forEach((item: { price: number; }) => ingrPrices.push(item.price!));
  for (let i = 0; i < ingrPrices.length; i++) {
    totalSum += ingrPrices[i];
  }
  return totalSum;
};

export const getCurrentDate = (date: any) => {
  if (isToday(date)) {
    return 'Сегодня'
  } else if (isYesterday(date)) {
    return 'Вчера'
  } else {
    return format((date), 'MM.dd.yyyy');
  }
};

export function filterOrderFeed(array: any, id: string) {
  let filteredArray = array.filter((obj: { _id: any }) => obj._id === id);
  return filteredArray[0];
}