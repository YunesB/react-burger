import './Modal.css';
import React from 'react';

function ModalOverlay(props) {

  function closeModal(evt) {
    if (!evt.target.closest('.modal__container')) {
      props.closeModal();
    }
  }

  React.useEffect(() => {
    const closeModal = (evt) => {
      if( evt.keyCode === 27 ) {
        props.closeModal();
      }
    }
    window.addEventListener('keyup', closeModal);
    return () => window.removeEventListener('keyup', closeModal)
  }, [props.isOpen])


  return (
      <div className={`modal ${props.isOpen ? 'modal_opened ' : ' '}`} onClick={ (evt)=> closeModal(evt) }>
        {props.children}
      </div>
  );
}

export default ModalOverlay;