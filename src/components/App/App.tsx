import React from 'react';
import './App.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredietns';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';


function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
}

export default App;
