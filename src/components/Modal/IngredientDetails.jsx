import './Modal.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientDetails(props) {
  const cardData = props.selectedCard;

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
            <p className="text text_type_main-default text_color_inactive">{cardData.carbohydrates }</p>
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
        <button type="button" className="modal__close modal__close_modified" onClick={() => props.closeModal()}>
          <CloseIcon type="primary" />
        </button>
      </div>
    </div>
  );
}

export default IngredientDetails;