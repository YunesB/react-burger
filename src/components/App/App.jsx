import React from 'react';
import AppStyles from './App.module.css';

import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from '../../services/actions/burgerIngredients';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredietns';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../Modal/IngredientDetails';
import OrderDetails from '../Modal/OrderDetails';
import Modal from '../Modal/Modal';
import Loading from '../Modal/Loading';

function App() {

  const [ isModalOpenIngredients, setModalOpenIngredients ] = React.useState(false);
  const [ isModalOpenOrder, setModalOpenOrder ] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  const isPageLoading = useSelector(
    (state) => state.burgerIngredients.isPageLoading
  )

  const isOrderLoading = useSelector(
    (state) => state.burgerConstructor.isPageLoading
  )

  function handleModalOpenIngredients() {
    setModalOpenIngredients(true);
  }

  function handleModalCloseIngredients() {
    setModalOpenIngredients(false);
  }

  function handleModalOpenOrder() {
    setModalOpenOrder(true);
  }

  function handleModalCloseOrder() {
    setModalOpenOrder(false);
  };

  const IngredientModal = (
    <IngredientDetails
      closeModal={handleModalCloseIngredients}
    />
  );

  const OrderModal = (
    <OrderDetails
      closeModal={handleModalCloseOrder}
    />
  );

  return (
    <div className={AppStyles.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <main className={AppStyles.componentContainer}>
        <BurgerIngredients
          openModal = {handleModalOpenIngredients}
        />
        <BurgerConstructor    
          openModal = {handleModalOpenOrder}
        />
      </main>
      </DndProvider>
      <Modal 
        isOpen={isModalOpenIngredients}
        closeModal={handleModalCloseIngredients}
        children={IngredientModal}
      />
      <Modal
        isOpen={isModalOpenOrder}
        closeModal={handleModalCloseOrder}
        children={OrderModal}
      />
      <Loading 
        isOpen = {isPageLoading || isOrderLoading}
      />
    </div>
  );
}

export default App;
