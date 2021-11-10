import ModalStyles from './Modal.module.css';
import { useSelector } from "../../services/hooks";

const IngredientDetails = () => {

  const selectedIngredient = useSelector(
    (state) => state.burgerIngredients.selectedIngredient
  );

  const cardData = selectedIngredient;

  return (
    <div className={`${ModalStyles.modal__contentBox} pt-10 pb-15`}> 
      <h2 className={`${ModalStyles.modal__title_modified} text text_type_main-large pl-10`}>
        Детали ингредиента
      </h2>
      <div className={`${ModalStyles.modal__imgContainer} mb-4`}>
        <img src={cardData.image || ''} alt="tick animation" className={ModalStyles.modal__ingImage} />
      </div>
      <p className="text text_type_main-medium mb-8">
        {cardData.name || ''}
      </p>
      <ul className={ModalStyles.modal__statsList}>
        <li className={ModalStyles.modal__statsListItem}>
          <p className={`${ModalStyles.modal__category} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{cardData.calories || ''}</p>
        </li>
        <li className={ModalStyles.modal__statsListItem}>
          <p className={`${ModalStyles.modal__category} text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{cardData.carbohydrates || ''}</p>
        </li>
        <li className={ModalStyles.modal__statsListItem}>
          <p className={`${ModalStyles.modal__category} text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{cardData.fat || ''}</p>
        </li>
        <li className={ModalStyles.modal__statsListItem}>
          <p className={`${ModalStyles.modal__category} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{cardData.proteins || ''}</p>
        </li>
      </ul>
    </div>
  );
}


export default IngredientDetails;