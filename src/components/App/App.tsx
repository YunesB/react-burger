import './App.css';
import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredietns';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import Modal from '../Modal/Modal';
import ModalOverlay from '../Modal/ModalOverlay';

import { api } from '../../utils/Api';

function App() {

  const [ isCardsData, setCardData ] = React.useState();
  const [ isModalOpen, setModalOpen ] = React.useState(false);
  // const [ isModalOpenOrder, setModalOpenOrder ] = React.useState(false);
  const [ isModalType, setModalType ] = React.useState(true);

  const [ selectedCard, setSelectedCard ] = React.useState();

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  function changeModalType() {
    setModalType(!isModalType);
  }

  function changeSelectedCard(card: any) {
    setSelectedCard(card);
    console.log(card);
  };

  // function handleOrderOpen () {
  //   setModalOpenOrder(true);
  // }

  // function handleOrderClose() {
  //   setModalOpenIngredient(false);
  // }

  React.useEffect(() => {
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
        console.log('App boot success');
      })
  }, []);

  if (!isCardsData){
    return null;
  }

  return (
    <div className="App">
      <AppHeader />
      <main className="component-container">
        <BurgerIngredients
          changeSelectedCard = {changeSelectedCard}
          selectedCard = {selectedCard}
          cardsData = {isCardsData || null}
        />
        <BurgerConstructor 
          cardsData = {isCardsData || null}
        />
      </main>
      <ModalOverlay 
        isOpen={isModalOpen}
      >
        <Modal 
          selectedCard = {selectedCard}
          cardData={isCardsData}
          modalType={isModalType}
          onOpen={handleModalOpen}
          onClose={handleModalClose}
        />
      </ModalOverlay>
    </div>
  );
}

export default App;
