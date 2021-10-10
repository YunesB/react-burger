import React from 'react';
import AppStyles from './App.module.css';

import { BrowserRouter as Router, Switch, Redirect, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from '../../services/actions/burgerIngredients';
import { getCurrentUser } from '../../services/actions/currentSession';
import { authorizeUser } from '../../services/actions/currentSession';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteAuth from '../ProtectedRoute/ProtectedRouteAuth';

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
import { loginApi } from '../../utils/LoginApi';

function App() {

  const [ isModalOpenIngredients, setModalOpenIngredients ] = React.useState(false);
  const [ isModalOpenOrder, setModalOpenOrder ] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

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

  function refreshToken() {
    if(isUserAuth === false) {
      loginApi.updateToken()
        .then((data) => {
          localStorage.setItem('accessToken', data.accessToken)
          console.log('token refresh success');
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
          dispatch(authorizeUser(false));
        })
    }
  }

  React.useEffect(() => {
    dispatch(getIngredientsData());
    dispatch(getCurrentUser());
  }, [dispatch]);

  React.useEffect(() => {
    let jwt = localStorage.getItem('refreshToken')
    if(jwt) {
      loginApi.getUserInfo()
      .then(() => {
        dispatch(authorizeUser(true));
        history && history.push('/');
      })
      .catch((err) => {
        console.log(err);
        if(err.message === 'jwt expired') {
          refreshToken();
        }
      })
    }
  }, []);

  return (
    <div className={AppStyles.App}>
      <Router>
      <AppHeader />
      <main className={AppStyles.componentContainer}>
        <Switch>
          <ProtectedRoute path="/" exact={true} redirect={false}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients
                openModal = {handleModalOpenIngredients}
              />
              <BurgerConstructor    
                openModal = {handleModalOpenOrder}
              />
            </DndProvider>
          </ProtectedRoute>
          <ProtectedRoute path="/account" redirect={false}>
            <Account />
          </ProtectedRoute>
          <ProtectedRouteAuth path="/login">
            <Login />
          </ProtectedRouteAuth>
          <ProtectedRouteAuth path="/register">
            <Register />
          </ProtectedRouteAuth>
          <ProtectedRouteAuth path="/forgot-password">
            <ForgotPassword />
          </ProtectedRouteAuth>
          <ProtectedRoute path="/reset-password" redirect={true}>
            <RecoverPassword />
          </ProtectedRoute>
          {
            isUserAuth ? <Redirect to="/"/> : <Redirect to="/login"/>
          }
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
