import './Modal.css';
import tick from '../../images/tick.gif';
import loading from '../../images/loading.svg';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails(props) {

  function handleModalClose() {
    props.changeModalType();
    props.closeModal();
  } 
  
  // const cardData = props.selectedCard;
  
  return (
    <div className='modal__container'>
      <div className="modal__content-box pt-30 pb-30">
        <h2 className="modal__title modal__title_shadow text text_type_digits-large mb-8">
          123456
        </h2>
        <p className="modal__subtitle text text_type_main-medium mb-15">идентификатор заказа</p>
        <div className="modal__img-container mb-15">
          <img src={tick || loading} alt="tick animation" className="modal__image" />
        </div>
        <div className="modal__text-container">
          <p className="modal__text text text_type_main-small mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="modal__text text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
        <button type="button" className="modal__close" onClick={() => handleModalClose()}>
          <CloseIcon type="primary" />
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;