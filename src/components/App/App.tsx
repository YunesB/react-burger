import React from "react";
import AppStyles from "./App.module.css";

import { Switch, useHistory, Route, useLocation } from "react-router-dom";

import { getIngredientsData } from "../../services/actions/burgerIngredients";
import { getCurrentUser } from "../../services/actions/currentSession";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedRouteAuth from "../ProtectedRoute/ProtectedRouteAuth";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredietns";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Account from "../../pages/Account/Account";

import Login from "../../pages/Authorization/Login";
import Register from "../../pages/Authorization/Register";
import ForgotPassword from "../../pages/Authorization/ForgotPassword";
import RecoverPassword from "../../pages/Authorization/RecoverPassword";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage/IngredientDetailsPage";
import OrderFeed from "../../pages/OrderFeed/OrderFeed";
import OrderDetailsPage from "../../pages/OrderDetailsPage/OrderDetailsPage";
import NotFound from "../../pages/NotFound/NotFound";

import IngredientDetails from "../Modal/IngredientDetails";
import OrderDetails from "../Modal/OrderDetails";
import OrderData from "../Modal/OrderData";
import Modal from "../Modal/Modal";
import Loading from "../Modal/Loading";
import { loginApi } from "../../utils/LoginApi";

import { useSelector, useDispatch } from "../../services/hooks";
// import { wsConnectionStart } from "../../services/actions/wsActions";

import { TLocationState } from '../../types';

const App = () => {

  const [isModalOpenIngredients, setModalOpenIngredients] =
    React.useState<boolean>(false);
  const [isModalOpenOrder, setModalOpenOrder] = React.useState<boolean>(false);
  const [isModalOpenOrderData, setModalOpenOrderData] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const background =
    history.action === "PUSH" && location.state && location.state.background;

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

  const IngredientModal = <IngredientDetails />;
  const OrderModal = <OrderDetails />;
  const OrderDataModal = <OrderData isModal={true}/>

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
  }

  function handleModalOpenOrderData() {
    setModalOpenOrderData(true);
  }

  function handleModalCloseOrderData() {
    setModalOpenOrderData(false);
  }

  function refreshToken() {
    let refreshJwt = localStorage.getItem("refreshToken");
    if (isUserAuth === false) {
      localStorage.removeItem("accessToken");
      loginApi
        .updateToken(refreshJwt)!
        .then((data: any) => {
          localStorage.setItem("accessToken", data.accessToken);
          console.log("token refresh success");
          getCurrentUser(() => null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    let refreshJwt = localStorage.getItem("refreshToken");
    dispatch(getIngredientsData());
    if (refreshJwt) {
      dispatch(getCurrentUser(() => refreshToken()));
    }
  }, [dispatch]);

  return (
    <div className={AppStyles.App}>
      <AppHeader />
      <main className={AppStyles.componentContainer}>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients openModal={handleModalOpenIngredients} />
              <BurgerConstructor openModal={handleModalOpenOrder} />
            </DndProvider>
          </Route>
          <Route path="/ingredient/:id" exact={true}>
            <IngredientDetailsPage />
          </Route>
          <ProtectedRoute path="/account" redirect={false}>
            <Account 
              openModal={handleModalOpenOrderData}
            />
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
          <Route path="/feed" exact={true}>
            <OrderFeed 
              openModal={handleModalOpenOrderData}
            />
          </Route>
          <Route path="/feed/:id" exact={true}>
            <OrderDetailsPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
          {/* {isUserAuth ? <Redirect to="/" /> : <Redirect to="/login" />} */}
        </Switch>
      </main>
      {background && (
        <Route
          path="/ingredient/:id"
          children={
            <Modal
              isOpen={isModalOpenIngredients}
              closeModal={handleModalCloseIngredients}
              children={IngredientModal}
            />
          }
        />
      )}
      <Modal
        isOpen={isModalOpenOrder}
        closeModal={handleModalCloseOrder}
        children={OrderModal}
      />
      {background && (
        <Route
          path="/feed/:id"
          children={
            <Modal
              isOpen={isModalOpenOrderData}
              closeModal={handleModalCloseOrderData}
              children={OrderDataModal}
          />
          }
        />
      )}
      <Loading isOpen={isPageLoading || isOrderLoading || isAccountLoading} />
    </div>
  );
}

export default App;
