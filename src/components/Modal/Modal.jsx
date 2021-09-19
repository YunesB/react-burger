import ModalStyles from './Modal.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from './ModalOverlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal(props) {

  React.useEffect(() => {
    const closeModal = (evt) => {
      if( evt.keyCode === 27 ) {
        props.closeModal();
      }
    }
    window.addEventListener('keyup', closeModal);
    return () => window.removeEventListener('keyup', closeModal)
  }, [ props.isOpen ]);

  return(
    <section className={props.isOpen ? ModalStyles.modal_opened : ModalStyles.modal}>
      <div className={ModalStyles.modal__container}>
        {props.children}
        <button type="button" className={ModalStyles.modal__close_modified} onClick={() => props.closeModal()}>
          <CloseIcon type="primary" />
        </button>
      </div>
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