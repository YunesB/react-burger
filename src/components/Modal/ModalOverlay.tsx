import ModalStyles from './Modal.module.css';

interface IModalOverlay {
  closeModal: () => void;
}

const ModalOverlay: React.FC<IModalOverlay> = (props) => {
  return (
      <div className={ModalStyles.modal_overlay} onClick={props.closeModal}>
        {props.children}
      </div>
  );
}

export default ModalOverlay;