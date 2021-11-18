import React from 'react';
import FeedStyles from './OrderFeed.module.css';
import AppStyles from '../../components/App/App.module.css';

import { useSelector, useDispatch } from "../../services/hooks";
import OrderItem from '../../components/OrderHistory/OrderItem';
import { wsConnectionStart } from "../../services/actions/wsActions";
import { TCardData } from '../../types';

interface IOrderFeed {
  openModal?: () => void;
}

const OrderFeed = (props: IOrderFeed) => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(wsConnectionStart());
  }, [dispatch]);

  let orderFeedArray;
  let finishedOrders;
  let currentOrders;

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  const orderFeed = useSelector(
    (state) => state.orderFeed
  );

  if (burgerIngredientsArray.length === 0 || orderFeed.wsConnected === false || orderFeed.isPageLoading === true) {
    return <div className={`${AppStyles.centeredComponent} text text_type_main-large`}>Загрузка...</div>
  }

  orderFeedArray = orderFeed.orderFeedData.orders;
  finishedOrders = orderFeedArray.filter((obj: { status: string; }) => obj.status === 'done').slice(0,5);
  currentOrders = orderFeedArray.filter((obj: { status: string; }) => obj.status !== 'done').slice(0,5);

  return (
    <div className={FeedStyles.orderFeed}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={FeedStyles.contentBox}>
        <ul className={FeedStyles.list}>
          {orderFeedArray.map((card: TCardData) =>
            <OrderItem card={card} feed={false} key={card._id} openModal={props.openModal} isAuth={false} />
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
              {finishedOrders && finishedOrders.map((card: TCardData, index: number) => ( 
                <li className='text text_type_digits-default mb-2' key={index}>0{card.number}</li>
              ))}
            </ul>
            <ul className={FeedStyles.orderListReady}>
              {currentOrders.length === 0 ? 
              <li className='text text_type_main-small'>Все текущие заказы готовы!</li>
              : currentOrders && currentOrders.map((card: TCardData, index: number) => ( 
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