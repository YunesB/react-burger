import './BurgerConstructor.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import cardData from '../../utils/data';

import BasketItem from '../BasketItem/BasketItem';

function BurgerConstructor() {

  function filterArray (string) {
    return cardData.filter((obj) => obj.type === string);
  };

  const mainArray = filterArray('main');

  return (
    <section className="basket pt-25">     
      <ul className="basket__list">
        <li className="basket__list-item mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={cardData[0].image}
          />
        </li>
        <span className="basket__list-container">
          {mainArray.map((card) => (
            <BasketItem
              card={card}
              key={card._id}
            />
          ))}
        </span>
        <li className="basket__list-item mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={cardData[0].image}
          />
        </li>
      </ul>
      <div className="basket__container mt-10">
        <div className="basket__total-container mr-10">
          <p className="text text_type_digits-medium mr-3">620</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  cardData: PropTypes.array
}; 

export default BurgerConstructor;
