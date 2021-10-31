import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";

import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import BasketItem from "../BasketItem/BasketItem";
import { TBasketCard } from "../../types";

import {
  getConstructorData,
  addConstructorItem,
} from "../../services/actions/burgerConstructor";
import { setSelectedBun } from "../../services/actions/burgerIngredients";

interface IBurgerConstructor {
  openModal: () => void
}

const BurgerConstructor: React.FC<IBurgerConstructor> = (props) => {

  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(true);

  const burgerConstructorArray = useSelector(
    (state: any) => state.burgerConstructor.burgerConstructorArray
  );

  const selectedBun = useSelector(
    (state: any) => state.burgerIngredients.selectedBun
  );

  const isUserAuth = useSelector(
    (state: any) => state.currentSession.isCurrentUserAuth
  );

  const history = useHistory();
  const cardsData = burgerConstructorArray;
  const bunPrice = selectedBun.price;

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingr",
    drop(item: TBasketCard) {
      if (item.type !== "bun") {
        dispatch(addConstructorItem(item));
      } else {
        dispatch(setSelectedBun(item));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  function counTotalPrice(array: Array<TBasketCard>) {
    if (array.length === 0) {
      return;
    } else {
      let filteredDigits: any = array.map((item: TBasketCard) => item.price);
      filteredDigits.reduce((prev: number, curr: number) => {
        return (filteredDigits = prev + curr);
      });
      return parseInt(filteredDigits);
    }
  }

  React.useEffect(() => {
    if (cardsData.length > 0) {
      setTotalPrice(counTotalPrice(cardsData)! + bunPrice * 2);
    } else {
      setTotalPrice(bunPrice * 2);
    }
  }, [cardsData, bunPrice]);

  React.useEffect(() => {
    if (selectedBun._id === 0 && burgerConstructorArray.length === 0) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [selectedBun]);

  // const submitDisabledStyle = submitDisabled ? 0.3 : 1;

  function getIngredientIds(array: Array<TBasketCard>) {
    const bunId = selectedBun._id;
    const newArray = array.map((item: TBasketCard) => item._id);
    newArray.push(bunId);
    return { ingredients: newArray };
  }

  function submitOrder() {
    if (isUserAuth) {
      dispatch(getConstructorData(getIngredientIds(burgerConstructorArray)));
      props.openModal();
    } else {
      history.push("/login");
    }
  }

  return (
    <section
      className={`${BurgerConstructorStyles.basket} mt-25 `}
      ref={dropTarget}
    >
      <ul
        className={
          isHover
            ? BurgerConstructorStyles.basket__list_modified
            : BurgerConstructorStyles.basket__list
        }
      >
        <li className={`${BurgerConstructorStyles.basket__listItem} mr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={bunPrice}
            thumbnail={selectedBun.image}
          />
        </li>
        <span className={BurgerConstructorStyles.basket__listContainer}>
          {burgerConstructorArray.length === 0
            ? ""
            : burgerConstructorArray.map((card: TBasketCard, index: number) => (
                <BasketItem card={card} key={card.key} index={index} />
              ))}
        </span>
        <li className={`${BurgerConstructorStyles.basket__listItem} mr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={bunPrice}
            thumbnail={selectedBun.image}
          />
        </li>
      </ul>
      <div className={`${BurgerConstructorStyles.basket__container} mt-10`}>
        <div
          className={`${BurgerConstructorStyles.basket__totalContainer} mr-10`}
        >
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={submitOrder}
          // disabled={submitDisabled}
          // style={{ opacity: submitDisabledStyle }}
        >
          {isUserAuth ? "Оформить заказ" : "Войти в аккаунт"}
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
