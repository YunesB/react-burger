import React from 'react';

import { useSelector } from "react-redux";

import ModalStyles from './Modal.module.css';
import tick from '../../images/tick.gif';
import loading from '../../images/loading.svg';

import PropTypes from 'prop-types';

function OrderDetails() {
  
  const orderData = useSelector(
    (state) => state.burgerConstructor.orderData
  )
  
  return (
    <div className={`${ModalStyles.modal__contentBox} pt-30 pb-30`}> 
      <h2 className={`${ModalStyles.modal__title_shadow} text text_type_digits-large mb-8`}>
        {orderData.order.number}
      </h2>
      <p className={`${ModalStyles.modal__subtitle} text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <div className={`${ModalStyles.modal__imgContainer} mb-15`}>
        <img src={tick || loading} alt="tick animation" className={ModalStyles.modal__image} />
      </div>
      <div className={ModalStyles.modal__textContainer}>
        <p className={`${ModalStyles.modal__text} text text_type_main-small mb-2`}>
          Ваш заказ начали готовить
        </p>
        <p className={`${ModalStyles.modal__text} text text_type_main-default text_color_inactive`}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  closeModal: PropTypes.func.isRequired,
}; 

export default OrderDetails;