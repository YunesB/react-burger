import React from "react";
import OrderData from "../../components/Modal/OrderData";
import { useDispatch } from "../../services/hooks";
import { wsConnectionStart } from "../../services/actions/wsActions";

function OrderDetailsPage() {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(wsConnectionStart());
  }, [dispatch]);

  return (
    <OrderData 
      isModal={false}
    />
  );
}

export default OrderDetailsPage;
