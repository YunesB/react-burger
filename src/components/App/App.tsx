import './App.css';
import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredietns';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import cardData from '../../utils/data';


function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="component-container">
        <BurgerIngredients 
          cardData = {cardData}
        />
        <BurgerConstructor 
          cardData = {cardData}
        />
      </main>
    </div>
  );
}

export default App;
