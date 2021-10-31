import React from "react";

import BurgerIngredientStyle from "./BurgerIngredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIngredient } from "../../services/actions/burgerIngredients";
import { useDrag } from "react-dnd";

import { TBasketCard } from "../../types";

interface IBurgerIngredient {
  card: TBasketCard;
  openModal: () => void;
}

const BurgerIngredient: React.FC<IBurgerIngredient> = (props) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const [itemCount, setItemCount] = React.useState<number>(0);
  const [bunCount, setBunCount] = React.useState<number>(0);

  const burgerConstructorArray = useSelector(
    (state: any) => state.burgerConstructor.burgerConstructorArray
  );

  const selectedBun = useSelector(
    (state: any) => state.burgerIngredients.selectedBun
  );

  React.useEffect(() => {
    if (props.card.type === "bun" && selectedBun._id === props.card._id) {
      setBunCount(2);
    } else {
      setBunCount(0);
    }
    const array = burgerConstructorArray.filter(
      (item: TBasketCard) => item._id === props.card._id
    );
    setItemCount(array.length);
  }, [burgerConstructorArray, selectedBun]);

  const [{ isDrag }, dragRef]: any = useDrag({
    type: "ingr",
    item: props.card,
  });

  function handleCardClick(card: TBasketCard) {
    dispatch(setSelectedIngredient(card));
    props.openModal();
  }

  if (!props.card || isDrag) {
    return null;
  } else {
    return (
      <Link
        to={{
          pathname: `/ingredient/${props.card._id}`,
          state: { background: location },
        }}
        className={`${BurgerIngredientStyle.ingredient} ml-4 mr-4 mb-8`}
        onClick={() => handleCardClick(props.card)}
        ref={dragRef}
      >
        <Counter
          count={props.card.type !== "bun" ? itemCount : bunCount}
          size="default"
        />
        <img
          src={props.card.image}
          alt={props.card.name}
          className={`${BurgerIngredientStyle.ingredient__image} ml-4 mr-4`}
        />
        <div className={BurgerIngredientStyle.ingredient__priceBox}>
          <p
            className={`${BurgerIngredientStyle.ingredient__price} text text_type_digits-default mb-1 mt-1`}
          >
            {props.card.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={BurgerIngredientStyle.ingredient__text}>
          {props.card.name}
        </p>
      </Link>
    );
  }
}

export default BurgerIngredient;
