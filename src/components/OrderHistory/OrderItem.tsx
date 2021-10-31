import OrderStyles from './OrderHistory.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderItem {
  card: any;
  feed: any;
}

const OrderItem: React.FC<IOrderItem> = (props) => {

  const cardData = props.card;

  return (
    <li className={`${OrderStyles.listItem} mb-6`}>
      <div className={`${OrderStyles.textBox} mb-6`}>
        <p className='text text_type_digits-default'>#11111</p>
        <p className='text text_type_main-default text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
      </div>
      <h2 className='text text_type_main-medium mb-2'>Death Star Starship Main бургер</h2>
      <p className={`${props.feed ? OrderStyles.hidden : OrderStyles.visible } text text_type_main-small mb-7`}>Создан</p>
      <div className={OrderStyles.dataBox}>
        <ul className={OrderStyles.ingrList}>
          <li className={OrderStyles.ingItem}>
            <img src={cardData.image} alt={cardData.name} className={OrderStyles.img} />
          </li>
          <li className={OrderStyles.ingItem}>
            <img src={cardData.image} alt={cardData.name} className={OrderStyles.img} />
          </li>
          <li className={OrderStyles.ingItem}>
            <img src={cardData.image} alt={cardData.name} className={OrderStyles.img} />
          </li>
        </ul>
        <div className={OrderStyles.textContainer}>
          <p className='text text_type_digits-default mr-2'>1111</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default OrderItem;