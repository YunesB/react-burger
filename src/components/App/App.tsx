import React from 'react';
import AppStyles from './App.module.css';
import * as CONSTANTS from '../../utils/constants';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredietns';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import IngredientDetails from '../Modal/IngredientDetails';
import OrderDetails from '../Modal/OrderDetails';

import Modal from '../Modal/Modal';
import Loading from '../Modal/Loading';

import { api } from '../../utils/Api';
import { IngredientsContext, OrderContext } from '../../utils/burgerContext';

function App() {

  const [ isCardsData, setCardData ] = React.useState();
  const [ isModalOpenIngredients, setModalOpenIngredients ] = React.useState(false);
  const [ isModalOpenOrder, setModalOpenOrder ] = React.useState(false);
  const [ isPageLoading, setPageLoading ] = React.useState(true);
  const [ selectedCard, setSelectedCard ] = React.useState({});
  const orderDataState = React.useState(CONSTANTS.DEFAULT_ORDER);

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

  function handleLoadingOpen() {
    setPageLoading(true)
  }

  function handleLoadingClose() {
    setPageLoading(false)
  }

  function changeSelectedCard(card: any) {
    setSelectedCard(card);
  };

  React.useEffect(() => {
    console.log(orderDataState)
    Promise.all([
      api.getCardsData(),
    ])
      .then((data) => {
        setCardData(data[0].data);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setPageLoading(false);
        console.log('App boot success');
      })
  }, []);

  const IngredientModal = (
    <IngredientDetails
      closeModal={handleModalCloseIngredients}
      selectedCard={selectedCard}
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
                changeSelectedCard = {changeSelectedCard}
                selectedCard = {selectedCard}
                cardsData = {isCardsData || null}
                openModal = {handleModalOpenIngredients}
              />
              <BurgerConstructor    
                openModal = {handleModalOpenOrder}
                openLoading = {handleLoadingOpen}
                closeLoading = {handleLoadingClose}
              />
            </main>
          </IngredientsContext.Provider>
        <Modal 
          isOpen={isModalOpenIngredients}
          selectedCard = {selectedCard}
          closeModal={handleModalCloseIngredients}
          children={IngredientModal}
        />
          <Modal
            isOpen={isModalOpenOrder}
            closeModal={handleModalCloseOrder}
            children={OrderModal}
          />
        <Loading 
          isOpen = {isPageLoading}
        />   
      </OrderContext.Provider>
    </div>
  );
}

export default App;
