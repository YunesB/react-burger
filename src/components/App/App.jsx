import React from 'react';
import AppStyles from './App.module.css';

import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from '../../services/actions/burgerIngredients';

import * as CONSTANTS from '../../utils/constants';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredietns';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import IngredientDetails from '../Modal/IngredientDetails';
import OrderDetails from '../Modal/OrderDetails';

import Modal from '../Modal/Modal';
import Loading from '../Modal/Loading';

import { IngredientsContext, OrderContext } from '../../utils/burgerContext';

// const composeEnhancers =
// typeof window === 'object' && window__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//   : compose; 

function App() {

  const [ isCardsData, setCardData ] = React.useState();
  const [ isModalOpenIngredients, setModalOpenIngredients ] = React.useState(false);
  const [ isModalOpenOrder, setModalOpenOrder ] = React.useState(false);

  const orderDataState = React.useState(CONSTANTS.DEFAULT_ORDER);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredientsData());
    setCardData(burgerIngredientsArray)
  }, [dispatch]);
  
  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

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

  if (!isCardsData){
    return null;
  }

  return (
    <div className={AppStyles.App}>
      <AppHeader />
      <OrderContext.Provider value={orderDataState}>
        <IngredientsContext.Provider value={isCardsData}>
          <main className={AppStyles.componentContainer}>
            <BurgerIngredients  
              cardsData = {burgerIngredientsArray || null}
              openModal = {handleModalOpenIngredients}
            />
            <BurgerConstructor    
              openModal = {handleModalOpenOrder}
            />
          </main>
        </IngredientsContext.Provider>
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
      </OrderContext.Provider>
    </div>
  );
}

export default App;
