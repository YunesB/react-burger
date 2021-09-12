import './BurgerConstructor.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BasketItem from '../BasketItem/BasketItem';
import propTypes from '../../utils/propTypes';

function BurgerConstructor(props) {

  const cardData = props.cardData;
  const bunPrice = 200;
  const totalPrice = counTotalPrice(cardData) + bunPrice;

  function counTotalPrice(array) {
    let filteredDigits = array.map((item) => item.price);
    filteredDigits.reduce((prev, curr) => { 
      return filteredDigits = prev + curr 
    });
    return filteredDigits;
  }

  function filterArray(string) {
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
            price={bunPrice}
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
            price={bunPrice}
            thumbnail={cardData[0].image}
          />
        </li>
      </ul>
      <div className="basket__container mt-10">
        <div className="basket__total-container mr-10">
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
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
  cardData: PropTypes.arrayOf
  (PropTypes.shape(propTypes)
  .isRequired).isRequired    
}; 

export default BurgerConstructor;
