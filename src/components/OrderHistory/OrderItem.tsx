import React from 'react';
import OrderStyles from './OrderHistory.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "../../services/hooks";
import { TBasketCard } from '../../types';

import { isToday, format } from 'date-fns';

interface IOrderItem {
  card: any;
  feed: any;
}

const OrderItem: React.FC<IOrderItem> = (props) => {
  const cardData = props.card;
  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  var date = format(new Date(props.card.createdAt), 'yyyy-MM-dd, hh:mm');
  console.log(isToday(new Date(props.card.createdAt)));
  
  const getIngr = () => {
    let Ingr: Array<TBasketCard> = [];
    cardData.ingredients.map((id: string) => {
      return burgerIngredientsArray.forEach((item) => {
        if (item._id === id) {
          Ingr.push(item!);
        }
      });
    });
    return Ingr;
  };

  const getTotalPrice = () => {
    let totalSum = 0;
    let ingrPrices: Array<number> = [];
    getIngr().forEach(item => ingrPrices.push(item.price!));
    for (let i = 0; i < ingrPrices.length; i++) {
      totalSum += ingrPrices[i];
    }
    return totalSum;
  };

  const ingArray = getIngr();
  const totalPrice = getTotalPrice();

  return (
    <li className={`${OrderStyles.listItem} mb-6`}>
      <div className={`${OrderStyles.textBox} mb-6`}>
        <p className='text text_type_digits-default'>{`#0${cardData.number}`}</p>
        <p className='text text_type_main-default text_color_inactive'>{date} i-GMT+3</p>
      </div>
      <h2 className='text text_type_main-medium mb-2'>{cardData.name}</h2>
      <p className={`${props.feed ? OrderStyles.hidden : OrderStyles.visible } text text_type_main-small mb-7`}>Создан</p>
      <div className={OrderStyles.dataBox}>
        <ul className={OrderStyles.ingrList}>
          {ingArray.length > 5 ? (
            <li className={OrderStyles.ingItem} key={5}>
              <img src={ingArray[5].image} alt={ingArray[5].name} className={OrderStyles.img} />
              <p className={`${OrderStyles.ingDigit} text text_type_digits-default`}>{`+${ingArray.length - 5}`}</p>
            </li>) : null
          }
          {ingArray && ingArray.slice(0,4).map((card: TBasketCard, index: number) => (
              <li className={OrderStyles.ingItem} key={index}>
                <img src={card.image} alt={cardData.name} className={OrderStyles.img} />
              </li>
          ))}
        </ul>
        <div className={OrderStyles.textContainer}>
          <p className='text text_type_digits-default mr-2'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default OrderItem;