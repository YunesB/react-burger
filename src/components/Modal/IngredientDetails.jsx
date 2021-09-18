import ModalStyles from './Modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function IngredientDetails(props) {
  const cardData = props.selectedCard;

  return (
    <div className={ModalStyles.modal__container}>
      <div className={`${ModalStyles.modal__contentBox} pt-10 pb-15`}>
        <h2 className={`${ModalStyles.modal__title_modified} text text_type_main-large pl-10`}>
          Детали ингредиента
        </h2>
        <div className={`${ModalStyles.modal__imgContainer} mb-4`}>
          <img src={cardData.image} alt="tick animation" className={ModalStyles.modal__ingImage} />
        </div>
        <p className="text text_type_main-medium mb-8">
          {cardData.name}
        </p>
        <ul className={ModalStyles.modal__statsList}>
          <li className={ModalStyles.modal__statsListItem}>
            <p className={`${ModalStyles.modal__category} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
            <p className="text text_type_main-default text_color_inactive">{cardData.calories}</p>
          </li>
          <li className={ModalStyles.modal__statsListItem}>
            <p className={`${ModalStyles.modal__category} text text_type_main-default text_color_inactive`}>Белки, г</p>
            <p className="text text_type_main-default text_color_inactive">{cardData.carbohydrates}</p>
          </li>
          <li className={ModalStyles.modal__statsListItem}>
            <p className={`${ModalStyles.modal__category} text text_type_main-default text_color_inactive`}>Жиры, г</p>
            <p className="text text_type_main-default text_color_inactive">{cardData.fat}</p>
          </li>
          <li className={ModalStyles.modal__statsListItem}>
            <p className={`${ModalStyles.modal__category} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
            <p className="text text_type_main-default text_color_inactive">{cardData.proteins}</p>
          </li>
        </ul>
        <button type="button" className={ModalStyles.modal__close_modified} onClick={() => props.closeModal()}>
          <CloseIcon type="primary" />
        </button>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  closeModal: PropTypes.func.isRequired,
  selectedCard: PropTypes.object.isRequired,
}; 


export default IngredientDetails;