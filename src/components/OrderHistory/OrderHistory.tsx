import React from 'react';
import OrderStyles from './OrderHistory.module.css';
import AppStyles from '../App/App.module.css';

import { useSelector, useDispatch } from "../../services/hooks";
import OrderItem from './OrderItem';

import { wsAuthConnectionStart } from '../../services/actions/wsAuthActions';

interface IOrderHistory {
  openModal: () => void;
}

const OrderHistory: React.FC<IOrderHistory> = (props) => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(wsAuthConnectionStart());
  }, [dispatch])

  const orderFeed = useSelector(
    (state) => state.userOrderFeed
  );

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );
  
  if (orderFeed.isPageLoading === true || burgerIngredientsArray.length === 0) {
    return <div className={`${AppStyles.centeredComponent} text text_type_main-large`}>Загрузка...</div>
  }

  return (
    <div className={OrderStyles.orderHistory}>
      <ul className={OrderStyles.profileList}>
        {orderFeed.orderFeedData.orders.map((card: any, index: number) => (
          <OrderItem card={card} openModal={props.openModal} feed={true} key={index} isAuth={false} />
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;