import './Modal.css';
import tick from '../../images/tick.gif';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal(props) {

  const cardData = props.cardData[0];
  console.log(cardData);

  if (props.modalType) {
    return (
      <div className='modal__container'>
        <div className="modal__content-box pt-10 pb-15">
          <h2 className="modal__title modal__title_modified text text_type_main-large pl-10">
            Детали ингредиента
          </h2>
          <div className="modal__img-container mb-4">
            <img src={cardData.image} alt="tick animation" className="modal__ing-image" />
          </div>
          <p className="text text_type_main-medium mb-8">
            {cardData.name}
          </p>
          <ul className="modal__stats-list">
            <li className="modal__stats-list-item">
              <p className="modal__category text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text text_type_main-default text_color_inactive">{cardData.calories}</p>
            </li>
            <li className="modal__stats-list-item">
              <p className="modal__category text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_main-default text_color_inactive">{cardData.carbohydrates}</p>
            </li>
            <li className="modal__stats-list-item">
              <p className="modal__category text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_main-default text_color_inactive">{cardData.fat}</p>
            </li>
            <li className="modal__stats-list-item">
              <p className="modal__category text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_main-default text_color_inactive">{cardData.proteins}</p>
            </li>
          </ul>
          <button type="button" className="modal__close modal__close_modified">
            <CloseIcon type="primary" />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='modal__container'>
        <div className="modal__content-box pt-30 pb-30">
          <h2 className="modal__title modal__title_shadow text text_type_digits-large mb-8">
            123456
          </h2>
          <p className="modal__subtitle text text_type_main-medium mb-15">идентификатор заказа</p>
          <div className="modal__img-container mb-15">
            <img src={tick} alt="tick animation" className="modal__image" />
          </div>
          <div className="modal__text-container">
            <p className="modal__text text text_type_main-small mb-2">
            Ваш заказ начали готовить
            </p>
            <p className="modal__text text text_type_main-default text_color_inactive">
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
          <button type="button" className="modal__close">
            <CloseIcon type="primary" />
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;