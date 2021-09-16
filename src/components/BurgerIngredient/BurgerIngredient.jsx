import './BurgerIngredient.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredient(props) {

  function handleCardClick(card) {
    props.changeSelectedCard(card);  
    props.openModal();
  }
  
  if (!props.card) {
    return null
  } else {
    return (
      <li className="ingredient ml-4 mr-4 mb-8" onClick={() => handleCardClick(props.card)}>
        <Counter count={1} size="default" />
        <img src={props.card.image} alt={props.card.name} className="ingredient__image ml-4 mr-4" />
        <div className="ingredient__price-box">
          <p className="ingredient__price text text_type_digits-default mb-1 mt-1">
            {props.card.price}
          </p>    
          <CurrencyIcon type="primary" />
        </div>
        <p className="ingredient__text">{props.card.name}</p>
      </li>
    );
  }
}

export default BurgerIngredient;