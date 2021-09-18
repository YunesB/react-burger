import ModalStyles from './Modal.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from './ModalOverlay';

function Modal(props) {

  React.useEffect(() => {
    const closeModal = (evt) => {
      if( evt.keyCode === 27 ) {
        props.closeModal();
      }
    }
    window.addEventListener('keyup', closeModal);
    return () => window.removeEventListener('keyup', closeModal)
  }, [ props.isOpen ])

  return(
    <section className={props.isOpen ? ModalStyles.modal_opened : ModalStyles.modal}>
      {props.children}
    <ModalOverlay 
      closeModal={props.closeModal}
    />
    </section>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  selectedCard: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
}; 

export default Modal;