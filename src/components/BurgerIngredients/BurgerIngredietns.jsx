import './BurgerIngredients.css';
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import propTypes from '../../utils/propTypes';

function BurgerIngredients(props) {

  const [ current, setCurrent ] = React.useState('one');
  const cardsData = props.cardsData;
  const openModal = props.openModal;

  const burgerIngredient = (card) => (
    <BurgerIngredient
      card={card}
      key={card._id}
      changeSelectedCard={props.changeSelectedCard}
      openModal = {openModal}
    />
  );

  function filterArray (string) {
    return cardsData.filter((obj) => obj.type === string);
  };

  const bunsArray = filterArray('bun');
  const sauceArray = filterArray('sauce');
  const mainArray = filterArray('main');

  return (
    <section className="ingredients">
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className="ingredients__menu-container">
        <h2 className="text text_type_main-medium mb-6 mt-10">Булки</h2>
        <ul className="ingredients__list" >
          {bunsArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
        <ul className="ingredients__list" >
          {sauceArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Начинки</h2>
        <ul className="ingredients__list">
          {mainArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  cardsData: PropTypes.arrayOf
  (PropTypes.shape(propTypes)
  .isRequired).isRequired,
  changeSelectedCard: PropTypes.func,
  selectedCard: PropTypes.any,
  openModal: PropTypes.func,
}; 

export default BurgerIngredients;