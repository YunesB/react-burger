import React from 'react';
import OrderStyles from './OrderHistory.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "../../services/hooks";
import { TBasketCard, TLocationState } from '../../types';

import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';

import { getIngr, getTotalPrice, getCurrentDate } from '../../utils/functions';

interface IOrderItem {
  card: any;
  feed: boolean;
  openModal?: any;
}

const OrderItem: React.FC<IOrderItem> = (props) => {
  const cardData = props.card;
  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  var time = format(new Date(props.card.createdAt), 'hh:mm');
  const date = new Date(props.card.createdAt);

  const currentDay = getCurrentDate(date);
  const ingrArray = getIngr(cardData, burgerIngredientsArray);
  const totalPrice = getTotalPrice(ingrArray);
  const location = useLocation<TLocationState>();

  return (
    <li className={`${OrderStyles.listItem} mb-6`}>
      <Link
        className={OrderStyles.link}
        onClick={props.openModal}
        to={{
          pathname: `/feed/${cardData._id}`,
          state: { background: location },
        }}
      >
        <div className={`${OrderStyles.textBox} mb-6`}>
          <p className='text text_type_digits-default'>{`#0${cardData.number}`}</p>
          <p className='text text_type_main-default text_color_inactive'>{`${currentDay}, в ${time} i-GMT+3`}</p>
        </div>
        <h2 className='text text_type_main-medium mb-2'>{cardData.name}</h2>
        <p className={`${props.feed ? OrderStyles.hidden : OrderStyles.visible } text text_type_main-small mb-7`}>Создан</p>
        <div className={OrderStyles.dataBox}>
          <ul className={OrderStyles.ingrList}>
            {ingrArray.length > 5 ? (
              <li className={OrderStyles.ingItem} key={5}>
                <img src={ingrArray[5].image} alt={ingrArray[5].name} className={OrderStyles.img} />
                <p className={`${OrderStyles.ingDigit} text text_type_digits-default`}>{`+${ingrArray.length - 5}`}</p>
              </li>) : null
            }
            {ingrArray && ingrArray.slice(0,4).map((card: TBasketCard, index: number) => (
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
      </Link>
    </li>
  );
}

export default OrderItem;