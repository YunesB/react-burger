import React from 'react';
import AppStyles from './App.module.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from '../../services/actions/burgerIngredients';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ProtectedRoute from '../../utils/ProtectedRoute';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredietns';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Account from '../../pages/Account/Account';

import Login from '../../pages/Authorization/Login';
import Register from '../../pages/Authorization/Register';
import ForgotPassword from '../../pages/Authorization/ForgotPassword';
import RecoverPassword from '../../pages/Authorization/RecoverPassword';

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

  const isUserAuth = useSelector(
    (state) => state.currentSession.isCurrentUserAuth
  );

  const isPageLoading = useSelector(
    (state) => state.burgerIngredients.isPageLoading
  );

  const isOrderLoading = useSelector(
    (state) => state.burgerConstructor.isPageLoading
  );

  const isAccountLoading = useSelector(
    (state) => state.currentSession.isAccountLoading
  )

  const isUserResetPassword = useSelector(
    (state) => state.currentSession.isUserResetPassword
  );

  function handleModalOpenIngredients() {
    setModalOpenIngredients(true);
  };

  function handleModalCloseIngredients() {
    setModalOpenIngredients(false);
  };

  function handleModalOpenOrder() {
    setModalOpenOrder(true);
  };

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
      <Router>
      <AppHeader />
      <main className={AppStyles.componentContainer}>
        <Switch>
          <ProtectedRoute path="/" exact={true} loggedIn={isUserAuth} redirect={false}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients
                openModal = {handleModalOpenIngredients}
              />
              <BurgerConstructor    
                openModal = {handleModalOpenOrder}
              />
            </DndProvider>
          </ProtectedRoute>
          <ProtectedRoute path="/account" loggedIn={isUserAuth} redirect={false}>
            <Account />
          </ProtectedRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <ProtectedRoute loggedIn={isUserResetPassword} path="/reset-password" redirect={true}>
            <RecoverPassword />
          </ProtectedRoute>
        </Switch>
      </main>
      </Router>
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
        isOpen = {isPageLoading || isOrderLoading || isAccountLoading}
      />
    </div>
  );
}

export default App;
