import './BurgerIngredients.css';

import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import cardData from '../../utils/data';

function BurgerIngredients() {

  const [current, setCurrent] = React.useState('one');

  function filterArray (string) {
    return cardData.filter((obj) => obj.type === string);
  };

  const bunsArray = filterArray('bun');
  const sauceArray = filterArray('sauce');
  const mainArray = filterArray('main');

  return (
    <section className="ingredients">
      <div className="ingredients__menu">
        <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
        <div className="ingredients__menu-container">
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
          <h2 className="text text_type_main-medium mb-6 mt-10">Булки</h2>
          <ul className="ingredients__list">
            {bunsArray.map((card) => (
              <BurgerIngredient
                card={card}
                key={card._id}
              />
            ))}
          </ul>
          <h2 className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
          <ul className="ingredients__list">
            {sauceArray.map((card) => (
              <BurgerIngredient
                card={card}
                key={card._id}
              />
            ))}
          </ul>
          <h2 className="text text_type_main-medium mb-6 mt-10">Основные</h2>
          <ul className="ingredients__list">
            {mainArray.map((card) => (
              <BurgerIngredient
                card={card}
                key={card._id}
              />
            ))}
          </ul>
        </div>
      </div>
      {/* <div className="ingredients_menu">
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
        <h2 className="text text_type_main-medium mb-6 mt-10">Булки</h2>
        <ul className="ingredients__list">
          {bunsArray.map((card) => (
            <BurgerIngredient
              card={card}
              key={card._id}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
        <ul className="ingredients__list">
          {sauceArray.map((card) => (
            <BurgerIngredient
              card={card}
              key={card._id}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Основные</h2>
        <ul className="ingredients__list">
          {mainArray.map((card) => (
            <BurgerIngredient
              card={card}
              key={card._id}
            />
          ))}
        </ul>
      </div> */}
    </section>
  );
}

export default BurgerIngredients;