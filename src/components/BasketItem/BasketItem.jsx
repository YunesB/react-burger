import BasketStyles from './BasketItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import propTypes from '../../utils/propTypes';

function BasketItem(props) {

  const cardData = props.card;

  return (
    <li className={`${BasketStyles.listItem} mb-4 mr-2`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={cardData.name}
        price={cardData.price}
        thumbnail={cardData.image}
      />
    </li>
  );
}

BasketItem.propTypes = {
  card: PropTypes.shape(propTypes).isRequired,
}; 

export default BasketItem;
