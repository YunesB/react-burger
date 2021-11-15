import ModalStyles from "./Modal.module.css";
import AppStyles from '../App/App.module.css';

import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngr, getTotalPrice, getCurrentDate, filterOrderFeed } from '../../utils/functions';
import { format } from 'date-fns';

interface TOrderData {
  isModal?: boolean;
}

const OrderData = (props: TOrderData) => {

  const { id } = useParams<{ id?: string }>();

  const orderFeed = useSelector(
    (state) => state.orderFeed
  );

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );
  
  if (orderFeed.isPageLoading === true || burgerIngredientsArray.length === 0) {
    return <div className={`${AppStyles.centeredComponent} text text_type_main-large`}>Загрузка...</div>
  }

  const cardData = filterOrderFeed(orderFeed.orderFeedData.orders, id!);
  var time = format(new Date(cardData.createdAt), 'hh:mm');
  const date = new Date(cardData.createdAt);
  const currentDay = getCurrentDate(date);
  const ingrArray = getIngr(cardData, burgerIngredientsArray);
  const totalPrice = getTotalPrice(ingrArray);

  return (
    <div className={`${props.isModal ? `${ModalStyles.orderBox} p-10` : ModalStyles.pageBox}`}>
      <p className="text text_type_digits-default mb-10 mt-5">#0{cardData.number}</p>
      <h2 className="text text_type_main-medium mb-2">{cardData.name}</h2>
      <p className={`${ModalStyles.statusText} text text_type_main-default mb-15`}>Выполнен</p>
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
        <p className='text text_type_main-default text_color_inactive'>{`${currentDay}, в ${time} i-GMT+3`}</p>
        <div className={`${ModalStyles.priceBox}`}>
          <p className='text text_type_digits-default mr-2'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderData;
