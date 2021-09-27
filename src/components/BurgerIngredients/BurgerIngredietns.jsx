import React from 'react';

import { useDispatch, useSelector } from "react-redux";

import BurgerIngredientsStyle from './BurgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import propTypes from '../../utils/propTypes';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
// import { IngredientsContext } from '../../utils/burgerContext';

function BurgerIngredients(props) {

  const [ current, setCurrent ] = React.useState('buns');
  const openModal = props.openModal;

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  function filterArray (string) {
    return burgerIngredientsArray.filter((obj) => obj.type === string);
  };

  const bunsArray = filterArray('bun');
  const sauceArray = filterArray('sauce');
  const mainArray = filterArray('main');

  const burgerIngredient = (card) => (
    <BurgerIngredient
      card={card}
      key={card._id}
      changeSelectedCard={props.changeSelectedCard}
      openModal = {openModal}
      changeSelectedBun = {props.changeSelectedBun}
    />
  );

  return (
    <section className={BurgerIngredientsStyle.ingredients}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={BurgerIngredientsStyle.ingredients__menuContainer}>
        <h2 className="text text_type_main-medium mb-6 mt-10">Булки</h2>
        <ul className={BurgerIngredientsStyle.ingredients__list} >
          {bunsArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
        <ul className={BurgerIngredientsStyle.ingredients__list} >
          {sauceArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Начинки</h2>
        <ul className={BurgerIngredientsStyle.ingredients__list}>
          {mainArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
      </div>
    </section>
  );
}

// BurgerIngredients.propTypes = {
//   cardsData: PropTypes.arrayOf
//   (PropTypes.shape(propTypes)
//   .isRequired).isRequired,
//   changeSelectedCard: PropTypes.func,
//   changeSelectedBun: PropTypes.func,
//   selectedCard: PropTypes.any,
//   openModal: PropTypes.func,
// }; 

export default BurgerIngredients;