import OrderStyles from './OrderHistory.module.css';
import { useSelector } from "react-redux";
import OrderItem from './OrderItem';

function OrderHistory() {

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  if (burgerIngredientsArray.length === 0) {
    return <></>
  }

  return (
    <div className={OrderStyles.orderHistory}>
      <ul className={OrderStyles.list}>
        <OrderItem card={burgerIngredientsArray[0]} />
      </ul>
    </div>
  );
}

export default OrderHistory;