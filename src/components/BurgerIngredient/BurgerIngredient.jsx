import './BurgerIngredient.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredient(props) {

  return (
    <li className="ingredient ml-4 mr-4">
      <Counter count={1} size="default" />
      <img src={props.card.image} className="ingredient__image ml-4 mr-4" />
      <p className="ingredient__price text text_type_digits-default mb-1 mt-1">
        {props.card.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className="ingredient__text">{props.card.name}</p>
    </li>
  );
}

export default BurgerIngredient;