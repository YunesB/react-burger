import './Modal.css';
import loading from '../../images/loading.svg'

function Loading(props) {

  return (
    <div className={`modal ${props.isOpen ? 'modal_opened ' : ' '}`}>
      <img src={loading} className="modal__loading" alt="loading animation" />
    </div>
  );
}

export default Loading;