import React from 'react';

import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BasketItem from '../BasketItem/BasketItem';
import PropTypes from 'prop-types';

import { getConstructorData, addConstructorItem } from '../../services/actions/burgerConstructor';
import { setSelectedBun } from '../../services/actions/burgerIngredients';

function BurgerConstructor(props) {

  const dispatch = useDispatch();
  const [ totalPrice, setTotalPrice ] = React.useState(0);

  const burgerConstructorArray = useSelector(
    (state) => state.burgerConstructor.burgerConstructorArray
  );

  const selectedBun = useSelector(
    (state) => state.burgerIngredients.selectedBun
  );

  const cardsData = burgerConstructorArray;
  const bunPrice = selectedBun.price;

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingr',
    drop(item) {
      if (item.type !== 'bun') { 
        dispatch(addConstructorItem(item)); 
      } else {
        dispatch(setSelectedBun(item));
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  function counTotalPrice(array) {
    if (array.length === 0) {
      return
    } else {
      let filteredDigits = array.map((item) => item.price);
      filteredDigits.reduce((prev, curr) => { 
        return filteredDigits = prev + curr 
      });
      return parseInt(filteredDigits);
    }
  }

  React.useEffect(() => {
    if (cardsData.length > 0) {
      setTotalPrice(counTotalPrice(cardsData) + bunPrice);
    } else {
      setTotalPrice(bunPrice);
    }
  }, [cardsData, bunPrice])

  function getIngredientIds(array) {
    const bunId = selectedBun._id
    const newArray = array.map((item) => item._id);
    newArray.push(bunId);
    return {ingredients: newArray};
  }

  function submitOrder() {
    dispatch(
      getConstructorData(getIngredientIds(burgerConstructorArray))
    )
    props.openModal();
  };

  return (
    <section className={`${BurgerConstructorStyles.basket} mt-25 `} ref={dropTarget}>     
      <ul className={isHover ? BurgerConstructorStyles.basket__list_modified : BurgerConstructorStyles.basket__list}>
        <li className={`${BurgerConstructorStyles.basket__listItem} mr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={bunPrice}
            thumbnail={selectedBun.image}
          />
        </li>
        <span className={BurgerConstructorStyles.basket__listContainer}>
          {burgerConstructorArray.length === 0 ? '' :
          burgerConstructorArray.map((card, index) => (
            <BasketItem
              card={card}
              key={card.key}
              index={index}
            />
          ))}
        </span>
        <li className={`${BurgerConstructorStyles.basket__listItem} mr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={bunPrice}
            thumbnail={selectedBun.image}
          />
        </li>
      </ul>
      <div className={`${BurgerConstructorStyles.basket__container} mt-10`}>
        <div className={`${BurgerConstructorStyles.basket__totalContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={submitOrder}>
          Оформить заказ
        </Button>
      </div>
      </section>
  );
}

BurgerConstructor.propTypes = {
  openLoading: PropTypes.func,
  closeLoading: PropTypes.func,
  openModal: PropTypes.func.isRequired,
}; 

export default BurgerConstructor;
