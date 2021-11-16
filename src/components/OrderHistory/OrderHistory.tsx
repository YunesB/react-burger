import OrderStyles from './OrderHistory.module.css';
import AppStyles from '../App/App.module.css';

import { useSelector } from "../../services/hooks";
import OrderItem from './OrderItem';

interface IOrderHistory {
  openModal: () => void;
}

const OrderHistory: React.FC<IOrderHistory> = (props) => {

  const orderFeed = useSelector(
    (state) => state.orderFeed
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
          <OrderItem card={card} openModal={props.openModal} feed={true} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;