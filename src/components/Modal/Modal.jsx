import OrderDetails from './OrderDetails';
import IngredientDetails from './IngredientDetails';

function Modal(props) {
  const cardData = props.selectedCard;

  if (props.modalType) {
    return (
      <IngredientDetails 
        selectedCard = {cardData}
        closeModal = {props.closeModal}
      />
    );
  } else {
    return (
      <OrderDetails  
        closeModal = {props.closeModal}
        changeModalType={props.changeModalType}
      />
    );
  }
}

export default Modal;