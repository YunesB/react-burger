import './BasketItem.css';
import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BasketItem(props) {

  const cardData = props.card;

  return (
    <li className="basket__list-item mb-4 mr-2">
      <DragIcon type="primary" />
      <ConstructorElement
        text={cardData.name}
        price={cardData.price}
        thumbnail={cardData.image}
      />
    </li>
  );
}

export default BasketItem;
