import OrderDetails from './OrderDetails';
import IngredientDetails from './IngredientDetails';
import PropTypes from 'prop-types';
import propTypes from '../../utils/propTypes';

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

Modal.propTypes = {
  selectedCard: PropTypes.object,
  closeModal: PropTypes.func,
  modalType: PropTypes.bool,
  changeModalType: PropTypes.func,
}; 

export default Modal;