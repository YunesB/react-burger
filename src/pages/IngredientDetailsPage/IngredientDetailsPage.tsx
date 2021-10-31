import React from "react";
import IngStyles from "./IngredientDetailsPage.module.css";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DEFAULT_ING } from "../../utils/constants";
import { TBasketCard } from '../../types'

function IngredientDetailsPage() {
  const [cardData, setCardData] = React.useState<TBasketCard>(DEFAULT_ING);

  const { id } = useParams<{ id?: string }>();

  const burgerIngredientsArray = useSelector(
    (state: any) => state.burgerIngredients.burgerIngredientsArray
  );

  React.useEffect(() => {
    let ingredient: any;
    burgerIngredientsArray.forEach((ing: TBasketCard) => {
      if (ing._id === id) {
        ingredient = ing;
      }
    });
    setCardData(ingredient);
  }, [burgerIngredientsArray, id]);

  return (
    <div className={`${IngStyles.contentBox}`}>
      <h2
        className={`${IngStyles.title_modified} text text_type_main-large pl-10`}
      >
        Детали ингредиента
      </h2>
      <div className={`${IngStyles.imgContainer} mb-4`}>
        <img
          src={cardData && cardData.image}
          alt="tick animation"
          className={IngStyles.ingImage}
        />
      </div>
      <p className="text text_type_main-medium mb-8">
        {cardData && cardData.name}
      </p>
      <ul className={IngStyles.statsList}>
        <li className={IngStyles.statsListItem}>
          <p
            className={`${IngStyles.category} text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {cardData && cardData.calories}
          </p>
        </li>
        <li className={IngStyles.statsListItem}>
          <p
            className={`${IngStyles.category} text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {cardData && cardData.carbohydrates}
          </p>
        </li>
        <li className={IngStyles.statsListItem}>
          <p
            className={`${IngStyles.category} text text_type_main-default text_color_inactive`}
          >
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {cardData && cardData.fat}
          </p>
        </li>
        <li className={IngStyles.statsListItem}>
          <p
            className={`${IngStyles.category} text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {cardData && cardData.proteins}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetailsPage;
