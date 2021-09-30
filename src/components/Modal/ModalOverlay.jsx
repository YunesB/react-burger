import ModalStyles from './Modal.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props) {
  return (
      <div className={ModalStyles.modal_overlay} onClick={props.closeModal}>
        {props.children}
      </div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
}; 

export default ModalOverlay;