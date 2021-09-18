import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BasketItem from '../BasketItem/BasketItem';

import PropTypes from 'prop-types';
import propTypes from '../../utils/propTypes';

function BurgerConstructor(props) {

  const cardsData = props.cardsData;
  const bunPrice = 200;
  let totalPrice;

  function counTotalPrice(array) {
    let filteredDigits = array.map((item) => item.price);
    filteredDigits.reduce((prev, curr) => { 
      return filteredDigits = prev + curr 
    });
    return filteredDigits;
  }

  if (cardsData) {
    totalPrice = counTotalPrice(cardsData) + bunPrice;
  }

  function filterArray(string) {
    return cardsData.filter((obj) => obj.type === string);
  };

  const mainArray = filterArray('main');

  return (
    <section className={`${BurgerConstructorStyles.basket} pt-25`}>     
      <ul className={BurgerConstructorStyles.basket__list}>
        <li className={`${BurgerConstructorStyles.basket__listItem} mr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={bunPrice}
            thumbnail={cardsData[0].image}
          />
        </li>
        <span className={BurgerConstructorStyles.basket__listContainer}>
          {mainArray.map((card) => (
            <BasketItem
              card={card}
              key={card._id}
            />
          ))}
        </span>
        <li className={`${BurgerConstructorStyles.basket__listItem} mr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={bunPrice}
            thumbnail={cardsData[0].image}
          />
        </li>
      </ul>
      <div className={`${BurgerConstructorStyles.basket__container} mt-10`}>
        <div className={`${BurgerConstructorStyles.basket__totalContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={() => props.openModal()}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  cardsData: PropTypes.arrayOf
  (PropTypes.shape(propTypes)
  .isRequired).isRequired,
  changeModalType: PropTypes.func,
  openModal: PropTypes.func,
}; 

export default BurgerConstructor;
