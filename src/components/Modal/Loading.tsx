import ModalStyles from './Modal.module.css';
import loading from '../../images/loading.svg';
import ModalOverlay from './ModalOverlay';

interface ILoading {
  isOpen: boolean;
}

const Loading:React.FC<ILoading> = (props) => {

  return (
    <div className={props.isOpen ? ModalStyles.modal_opened : ModalStyles.modal}>
      <img src={loading} className={ModalStyles.modal__loading} alt="loading animation" />
      <ModalOverlay 
        closeModal={() => null}
      />
    </div>
  );
}

export default Loading;