import './Modal.css';

function ModalOverlay(props) {

  // function closeModal(evt) {
  //   if (!evt.target.closest('.modal__container')) {
  //     props.closeModal();
  //   }
  // }

  return (
      <div className={`modal ${props.isOpen ? 'modal_opened ' : ' '}`} >
        {props.children}
      </div>
  );
}

export default ModalOverlay;