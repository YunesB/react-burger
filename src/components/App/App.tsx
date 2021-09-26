import React from 'react';
import AppStyles from './App.module.css';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../services/reducers/index';

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
  const [ isBunSelected, setBunSelected ] = React.useState({});

  const orderDataState = React.useState(CONSTANTS.DEFAULT_ORDER);
  const store = createStore(rootReducer, applyMiddleware(thunk));
  

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

  function changeSelectedBun(bun: any) {
    setBunSelected(bun);
  }

  function filterArray(array: any) {
    return array.filter((obj: any) => obj.type === 'bun')
  }

  React.useEffect(() => {
    setPageLoading(true);
    Promise.all([
      api.getCardsData(),
    ])
      .then((data) => {
        setCardData(data[0].data);
        const buns = filterArray(data[0].data)
        setBunSelected(buns[0]);
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
        <Provider store ={store}>
          <OrderContext.Provider value={orderDataState}>
            <IngredientsContext.Provider value={isCardsData}>
              <main className={AppStyles.componentContainer}>
                <BurgerIngredients  
                  selectedCard = {selectedCard}
                  changeSelectedCard = {changeSelectedCard}
                  changeSelectedBun = {changeSelectedBun}
                  cardsData = {isCardsData || null}
                  openModal = {handleModalOpenIngredients}
                />
                <BurgerConstructor    
                  openModal = {handleModalOpenOrder}
                  openLoading = {handleLoadingOpen}
                  closeLoading = {handleLoadingClose}
                  isBunSelected = {isBunSelected}
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
      </Provider>
    </div>
  );
}

export default App;
