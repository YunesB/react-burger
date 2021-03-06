import React from "react";
import OrderData from "../../components/Modal/OrderData";
import AppStyles from '../../components/App/App.module.css';

import { useDispatch, useSelector } from "../../services/hooks";
import { wsConnectionStart, wsConnectionClose } from "../../services/actions/wsActions";
import { wsAuthConnectionStart, wsAuthConnectionClose } from "../../services/actions/wsAuthActions";

function OrderDetailsPage() {

  const dispatch = useDispatch();

  const orderFeed = useSelector(
    (state) => state.orderFeed
  );

  const isUserAuth = useSelector(
    (state) => state.currentSession.isCurrentUserAuth
  );

  const userOrderFeed = useSelector(
    (state) => state.userOrderFeed
  );

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  React.useEffect((): () => void => {
    if (isUserAuth) {
      dispatch(wsAuthConnectionStart());
      return () => dispatch(wsAuthConnectionClose());
    } else {
      dispatch(wsConnectionStart());
      return () => dispatch(wsConnectionClose());
    }
  }, [dispatch, isUserAuth]);

  if (orderFeed.isPageLoading === true 
    || burgerIngredientsArray.length === 0 
    || userOrderFeed.orderFeedData === undefined  
    || orderFeed.orderFeedData === undefined
    ) {
    return <div className={`${AppStyles.centeredComponent} text text_type_main-large`}>Загрузка...</div>
  }

  return (
    <OrderData 
      isModal={false}
    />
  );
}

export default OrderDetailsPage;
