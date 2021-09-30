import React from 'react';
import BurgerIngredientsStyle from './BurgerIngredients.module.css';

import { useSelector } from "react-redux";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

function BurgerIngredients(props) {

  const selectedDiv = React.createRef();
  const bunsRef = React.createRef();
  const sauceRef = React.createRef();
  const mainRef = React.createRef();
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

  function handleTabs() {
    const topDivFrame = selectedDiv.current.offsetTop;
    const bunsClientRect = bunsRef.current.getBoundingClientRect().top;
    const sauceClientRect = sauceRef.current.getBoundingClientRect().top - 150;
    const mainClientRect = mainRef.current.getBoundingClientRect().top - 150;
    
    if (topDivFrame >= bunsClientRect && topDivFrame <= sauceClientRect) {
      setCurrent('buns');
    } else if (topDivFrame >= sauceClientRect && topDivFrame <= mainClientRect) {
      setCurrent('sauce');
    } else if (topDivFrame >= mainClientRect) {
      setCurrent('main');
    }
  }

  const burgerIngredient = (card) => (
    <BurgerIngredient
      card={card}
      key={card._id}
      changeSelectedCard={props.changeSelectedCard}
      openModal = {openModal}
      changeSelectedBun = {props.changeSelectedBun}
    />
  );

  function handleTabClick(string, ref) {
    if (ref !== null) {
      setCurrent(string);
      ref.scrollIntoView({behavior: "smooth"});
    }
  }

  return (
    <section className={BurgerIngredientsStyle.ingredients}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={() => handleTabClick('buns', bunsRef.current)}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce', sauceRef.current)}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => handleTabClick('main', mainRef.current)}>
          Начинки
        </Tab>
      </div>
      <div className={BurgerIngredientsStyle.ingredients__menuContainer} ref={selectedDiv} onScroll={handleTabs}>
        <h2 className="text text_type_main-medium mb-6 mt-10" ref={bunsRef}>Булки</h2>
        <ul className={BurgerIngredientsStyle.ingredients__list} >
          {bunsArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10" ref={sauceRef}>Соусы</h2>
        <ul className={BurgerIngredientsStyle.ingredients__list} >
          {sauceArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10" ref={mainRef}>Начинки</h2>
        <ul className={BurgerIngredientsStyle.ingredients__list}>
          {mainArray.map((card) => (
            burgerIngredient(card)
          ))}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func,
}; 

export default BurgerIngredients;