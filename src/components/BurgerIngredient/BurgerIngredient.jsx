import './BurgerIngredient.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredient(props) {

  return (
    <li className="ingredient ml-4 mr-4 mb-8">
      <Counter count={1} size="default" />
      <img src={props.card.image} className="ingredient__image ml-4 mr-4" />
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

export default BurgerIngredient;