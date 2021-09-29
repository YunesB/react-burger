import React from 'react';

import BurgerIngredientStyle from './BurgerIngredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import propTypes from '../../utils/propTypes';

import { useDispatch, useSelector } from "react-redux";
import { setSelectedBun, setSelectedIngredient } from '../../services/actions/burgerIngredients';
import { addConstructorItem } from '../../services/actions/burgerConstructor';
import { useDrag } from "react-dnd";

function BurgerIngredient(props) {

  const dispatch = useDispatch();
  const [ itemCount, setItemCount ] = React.useState(0);
  const [ bunCount, setBunCount ] = React.useState(0);

  const burgerConstructorArray = useSelector(
    (state) => state.burgerConstructor.burgerConstructorArray
  );

  const selectedBun = useSelector(
    (state) => state.burgerIngredients.selectedBun
  );
  
  React.useEffect(() => {
    if (props.card.type === 'bun' && selectedBun._id === props.card._id) {
      setBunCount('✓');
    } else {
      setBunCount('');
    }
    const array = burgerConstructorArray.filter((item) => item._id === props.card._id);
    setItemCount(array.length);
  }, [ burgerConstructorArray, selectedBun ]);

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingr',
    item: props.card,
  });

  function handleCardClick(card) {
    if (card.type === 'bun') {
      dispatch(setSelectedBun(card));
    } else {
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
        <Counter count={props.card.type !== 'bun' ? itemCount : bunCount} size="default" />
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