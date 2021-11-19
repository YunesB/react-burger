import { TBasketCard, TCardData } from "../types";
import { isToday, format, isYesterday } from 'date-fns';

export const getIngr = (array: TCardData | null, burgerIngredientsArray: Array<TBasketCard>) => {
  let Ingr: Array<TBasketCard> = [];
  array!.ingredients.map((id: string) => {
    return burgerIngredientsArray.forEach((item: TBasketCard) => {
      if (item._id === id) {
        Ingr.push(item!);
      }
    });
  });
  return Ingr;
};

export const getTotalPrice = (array: Array<TBasketCard>) => {
  let totalSum = 0;
  let ingrPrices: Array<number> = [];
  array.forEach((item) => ingrPrices.push(item.price!));
  for (let i = 0; i < ingrPrices.length; i++) {
    totalSum += ingrPrices[i];
  }
  return totalSum;
};

export const getCurrentDate = (date: Date) => {
  if (isToday(date)) {
    return 'Сегодня'
  } else if (isYesterday(date)) {
    return 'Вчера'
  } else {
    return format((date), 'MM.dd.yyyy');
  }
};

export function filterOrderFeed(array: Array<TCardData>, id: string) {
  let filteredArray = array.filter((obj: { _id: string }) => obj._id === id);
  return filteredArray[0];
}

export const getNumberOfIngrs = (array: TCardData) => {
  const idArray: any = {};
  array &&
  array.ingredients.forEach((id: string) => {
    if (!idArray[id]) idArray[id] = 0;
      idArray[id]++;
    });
  return idArray;
};

