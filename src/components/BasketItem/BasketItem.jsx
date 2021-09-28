import BasketStyles from './BasketItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import propTypes from '../../utils/propTypes';

import { useDrag } from "react-dnd";

function BasketItem(props) {

  const [{isDrag}, dragRef] = useDrag({
      type: 'draggedIngr',
      item: props.card,
      collect: monitor => ({
          isDrag: monitor.isDragging()
      })
  });

  const cardData = props.card;

  return (
    !isDrag &&
    <li className={`${BasketStyles.basketItem__listItem} mb-4 mr-2`} ref={dragRef}>
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
