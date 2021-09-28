import React from 'react';

import BurgerIngredientStyle from './BurgerIngredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import propTypes from '../../utils/propTypes';

import { useDispatch } from "react-redux";
import { setSelectedBun, setSelectedIngredient } from '../../services/actions/burgerIngredients';
import { addConstructorItem } from '../../services/actions/burgerConstructor';
import { useDrag } from "react-dnd";

function BurgerIngredient(props) {

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingr',
    item: props.card,
  });
  
  const dispatch = useDispatch();
  const [ itemAmount, setItemAmount ] = React.useState(0);

  function handleCardClick(card) {
    if (card.type === 'bun') {
      dispatch(setSelectedBun(card));
      setItemAmount(1);
    } else {
      setItemAmount(itemAmount + 1);
      dispatch(addConstructorItem(card));   
    }
    dispatch(setSelectedIngredient(card));
    props.openModal();
  }
  
  if (!props.card) {
    return null
  } else {
    return (
      !isDrag &&
      <li className={`${BurgerIngredientStyle.ingredient} ml-4 mr-4 mb-8`} onClick={() => handleCardClick(props.card)} ref={dragRef}>
        <Counter count={itemAmount} size="default" />
        <img src={props.card.image} alt={props.card.name} className={`${BurgerIngredientStyle.ingredient__image} ml-4 mr-4`} />
        <div className={BurgerIngredientStyle.ingredient__priceBox}>
          <p className={`${BurgerIngredientStyle.ingredient__price} text text_type_digits-default mb-1 mt-1`}>
            {props.card.price}
          </p>    
          <CurrencyIcon type="primary" />
        </div>
        <p className={BurgerIngredientStyle.ingredient__text}>{props.card.name}</p>
      </li>
    );
  }
}

BurgerIngredient.propTypes = {
  card: PropTypes.shape(propTypes).isRequired,
  openModal: PropTypes.func.isRequired,
}; 

export default BurgerIngredient;