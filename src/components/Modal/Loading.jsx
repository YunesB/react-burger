import ModalStyles from './Modal.module.css';
import loading from '../../images/loading.svg';

function Loading(props) {

  return (
    <div className={props.isOpen ? ModalStyles.modal_opened : ModalStyles.modal}>
      <img src={loading} className={ModalStyles.modal.modal__loading} alt="loading animation" />
    </div>
  );
}

export default Loading;