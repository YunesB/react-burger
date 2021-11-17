import React from "react";
import ModalStyles from "./Modal.module.css";
import AppStyles from '../App/App.module.css';

import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngr, getTotalPrice, getCurrentDate, filterOrderFeed, filterBothArrays } from '../../utils/functions';
import { format } from 'date-fns';
import NotFound from "../../pages/NotFound/NotFound";

import { useLocation } from "react-router-dom";

interface TOrderData {
  isModal?: boolean;
}

const OrderData = (props: TOrderData) => {

  const { id } = useParams<{ id?: string }>();
  const [ style, setStyle ] = React.useState<string>('red');
  const [ status, setStatus ] = React.useState<string>('Выполнен');
  const location = useLocation();

  const isUserAuth = useSelector(
    (state) => state.currentSession.isCurrentUserAuth
  );

  const orderFeed = useSelector(
    (state) => state.orderFeed
  );

  const userOrderFeed = useSelector(
    (state) => state.userOrderFeed
  );

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  let cardData: any = null;

  let time;
  let date;
  let currentDay;
  let ingrArray;
  let totalPrice;

  React.useEffect(() => {
    setOrderStatus(cardData);
  }, [cardData]);

  function setOrderStatus(card: any) {
    if (!card) {
      return
    } else if (card.status === 'done') {
      setStyle('#00CCCC')
      setStatus('Выполнен');
    } else if (card.status === 'pending') {
      setStyle('ligntblue')
      setStatus('В обработке');
    } else {
      setStyle('white');
      setStatus('Создан');
    }
  };
  
  if (orderFeed.isPageLoading === true 
    || burgerIngredientsArray.length === 0
    || (!isUserAuth && !orderFeed.orderFeedData) 
    || (isUserAuth && !userOrderFeed.orderFeedData)) {
    return <div className={`${AppStyles.centeredComponent} text text_type_main-large`}>Загрузка...</div>
  }

  if ((!isUserAuth && orderFeed && orderFeed.orderFeedData) 
  || (isUserAuth && userOrderFeed && userOrderFeed.orderFeedData)) {
    cardData = location.pathname === `/feed/${id}`
    ? filterOrderFeed(orderFeed.orderFeedData.orders, id!) 
    : filterOrderFeed(userOrderFeed.orderFeedData.orders, id!);
  }

  if (!cardData) {
    return <NotFound />
  }

  time = format(new Date(cardData.createdAt), 'hh:mm');
  date = new Date(cardData.createdAt);
  currentDay = getCurrentDate(date);
  ingrArray = getIngr(cardData, burgerIngredientsArray);
  totalPrice = getTotalPrice(ingrArray);

  return (
    <div className={`${props.isModal ? `${ModalStyles.orderBox} p-10` : ModalStyles.pageBox}`}>
      <p className="text text_type_digits-default mb-10 mt-5">#0{cardData.number || 'Загрузка...'}</p>
      <h2 className="text text_type_main-medium mb-2">{cardData.name  || 'Загрузка...'}</h2>
      <p className={`${ModalStyles.statusText} text text_type_main-default mb-15`} style={{ color: style }}>{status}</p>
      <p className="text text_type_main-medium mb-8">Cостав</p>
      <ul className={`${ModalStyles.list}`}>
        {ingrArray && ingrArray.map((card, index) => (
          <li className={`${ModalStyles.listItem} mb-4`} key={index}>
            <div className={`${ModalStyles.imgBox}`}>
              <img src={card.image} alt={card.name} className={`${ModalStyles.img} mr-4`} />
              <p className={`${ModalStyles.ingrText} text text_type_main-default`}>{card.name}</p>
            </div>
            <div className={`${ModalStyles.priceBox}`}>
              <p className={`text text_type_digits-default mr-2`}>{card.price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))} 
      </ul>
      <div className={`${ModalStyles.priceContainer} mt-10`}>
        <p className='text text_type_main-default text_color_inactive'>{`${currentDay}, в ${time} i-GMT+3` || 'Загрузка...'}</p>
        <div className={`${ModalStyles.priceBox}`}>
          <p className='text text_type_digits-default mr-2'>{totalPrice || 'Загрузка...'}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderData;
