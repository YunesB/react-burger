import React from 'react';
import FeedStyles from './OrderFeed.module.css';
import { useSelector } from "../../services/hooks";
import OrderItem from '../../components/OrderHistory/OrderItem';
import { TBasketCard } from '../../types';

function OrderFeed() {

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  const orderFeed = useSelector(
    (state) => state.orderFeed
  );

  const orderFeedArray = orderFeed.orderFeedData.orders;
  const finishedOrders = orderFeedArray.filter((obj: { status: string; }) => obj.status === 'done').slice(0,5);

  const currentOrders = orderFeedArray.filter((obj: { status: string; }) => obj.status !== 'done').slice(0,5);

  if (burgerIngredientsArray.length === 0) {
    return <></>
  }

  return (
    <div className={FeedStyles.orderFeed}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={FeedStyles.contentBox}>
        <ul className={FeedStyles.list}>
          {orderFeedArray.map((card: any) =>
            <OrderItem card={card} feed={true} key={card._id} />
          )}
        </ul>
        <div className={FeedStyles.ordersData}>
          <div className={`${FeedStyles.orderStatusBox} mb-15`}>
            <p className='text text_type_main-medium'>
              Готовы:
            </p>
            <p className='text text_type_main-medium'>
              В работе:
            </p>
            <ul className={FeedStyles.orderList}>
              {finishedOrders && finishedOrders.map((card: any, index: number) => ( 
                <li className='text text_type_digits-default mb-2' key={index}>0{card.number}</li>
              ))}
            </ul>
            <ul className={FeedStyles.orderListReady}>
              {currentOrders.length === 0 ? 
              <li className='text text_type_main-small'>Все текущие заказы готовы!</li>
              : currentOrders && currentOrders.map((card: any, index: number) => ( 
                <li className='text text_type_digits-default mb-2' key={index}>0{card.number}</li>
              ))}
            </ul>
          </div>
          <div className={`${FeedStyles.numBox} mb-15`}>
            <p className='text text_type_main-medium'>Выполнено за все время:</p>
            <p className={`${FeedStyles.number} text text_type_digits-large`}>{orderFeed.orderFeedData.total}</p>
          </div>
          <div className={FeedStyles.numBox}>
            <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
            <p className={`${FeedStyles.number} text text_type_digits-large`}>{orderFeed.orderFeedData.totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFeed;