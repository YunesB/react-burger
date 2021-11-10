import FeedStyles from './OrderFeed.module.css';
import { useSelector } from "../../services/hooks";
import OrderItem from '../../components/OrderHistory/OrderItem';

function OrderFeed() {

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  if (burgerIngredientsArray.length === 0) {
    return <></>
  }

  return (
    <div className={FeedStyles.orderFeed}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={FeedStyles.contentBox}>
        <ul className={FeedStyles.list}>
          <OrderItem card={burgerIngredientsArray[0]} feed={true} />
          <OrderItem card={burgerIngredientsArray[0]} feed={true} />
          <OrderItem card={burgerIngredientsArray[0]} feed={true} />
          <OrderItem card={burgerIngredientsArray[0]} feed={true} />
          <OrderItem card={burgerIngredientsArray[0]} feed={true} />
          <OrderItem card={burgerIngredientsArray[0]} feed={true} />
          <OrderItem card={burgerIngredientsArray[0]} feed={true} />
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
              <li className='text text_type_digits-default mb-2'>034533</li>
              <li className='text text_type_digits-default mb-2'>034533</li>
              <li className='text text_type_digits-default mb-2'>034533</li>
              <li className='text text_type_digits-default mb-2'>034533</li>
              <li className='text text_type_digits-default mb-2'>034533</li>
              <li className='text text_type_digits-default mb-2'>034533</li>
            </ul>
            <ul className={FeedStyles.orderListReady}>
              <li className='text text_type_digits-default mb-2'>034533</li>
              <li className='text text_type_digits-default mb-2'>034533</li>
              <li className='text text_type_digits-default mb-2'>034533</li>
            </ul>
          </div>
          <div className={`${FeedStyles.numBox} mb-15`}>
            <p className='text text_type_main-medium'>Выполнено за все время:</p>
            <p className={`${FeedStyles.number} text text_type_digits-large`}>28 752</p>
          </div>
          <div className={FeedStyles.numBox}>
            <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
            <p className={`${FeedStyles.number} text text_type_digits-large`}>138</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFeed;