import ModalStyles from './Modal.module.css';
import React from 'react';
import ModalOverlay from './ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<IModal> = (props) => {

  React.useEffect(() => {
    const closeModal = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
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

export default Modal;