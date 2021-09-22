import React from 'react';

import BurgerIngredientStyle from './BurgerIngredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import propTypes from '../../utils/propTypes';

function BurgerIngredient(props) {
  console.log(props);

  const [ itemAmount, setItemAmount ] = React.useState(0);

  function handleCardClick(card) {
    props.changeSelectedCard(card);  
    props.openModal();
  }

  function handleCounterClick(evt, card) {
    evt.stopPropagation();
    if (card.type === 'bun') {
      props.changeSelectedBun(card);
    }
    setItemAmount(0);
  }
  
  if (!props.card) {
    return null
  } else {
    return (
      <li className={`${BurgerIngredientStyle.ingredient} ml-4 mr-4 mb-8`} onClick={() => handleCardClick(props.card)}>
        <Counter count={itemAmount} size="default" />
        <img src={props.card.image} alt={props.card.name} className={`${BurgerIngredientStyle.ingredient} ml-4 mr-4`} />
        <div className={BurgerIngredientStyle.ingredient__priceBox} onClick={(evt) => handleCounterClick(evt, props.card)}>
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
  changeSelectedCard: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
}; 

export default BurgerIngredient;