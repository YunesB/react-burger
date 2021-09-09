import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
function BurgerIngredients() {

  const [current, setCurrent] = React.useState('one')

  return (
    <section className="section">
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Three
        </Tab>
      </div>
    </section>
  );
}

export default BurgerIngredients;