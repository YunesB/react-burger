import React from "react";
import BurgerIngredientsStyle from "./BurgerIngredients.module.css";

import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import { TBasketCard } from "../../types";

interface IBurgerIngredients {
  openModal: () => void;
}

const BurgerIngredients: React.FC<IBurgerIngredients> = (props) => {
  const selectedDiv = React.useRef<HTMLDivElement>(null);
  const bunsRef = React.useRef<HTMLHeadingElement>(null);
  const sauceRef = React.useRef<HTMLHeadingElement>(null);
  const mainRef = React.useRef<HTMLHeadingElement>(null);
  const [current, setCurrent] = React.useState<string>("buns");
  const openModal = props.openModal;

  const burgerIngredientsArray = useSelector(
    (state: any) => state.burgerIngredients.burgerIngredientsArray
  );

  function filterArray(string: string) {
    return burgerIngredientsArray.filter((obj: TBasketCard) => obj.type === string);
  }

  const bunsArray = filterArray("bun");
  const sauceArray = filterArray("sauce");
  const mainArray = filterArray("main");

  function handleTabs() {
    const topDivFrame = selectedDiv.current!.offsetTop;
    const bunsClientRect = bunsRef.current!.getBoundingClientRect().top;
    const sauceClientRect = sauceRef.current!.getBoundingClientRect().top - 150;
    const mainClientRect = mainRef.current!.getBoundingClientRect().top - 150;

    if (topDivFrame >= bunsClientRect && topDivFrame <= sauceClientRect) {
      setCurrent("buns");
    } else if (
      topDivFrame >= sauceClientRect &&
      topDivFrame <= mainClientRect
    ) {
      setCurrent("sauce");
    } else if (topDivFrame >= mainClientRect) {
      setCurrent("main");
    }
  }

  const burgerIngredient = (card: TBasketCard) => (
    <BurgerIngredient card={card} key={card._id} openModal={openModal} />
  );

  function handleTabClick(string: string, ref: Element) {
    if (ref !== null) {
      setCurrent(string);
      console.log(ref);
      ref.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className={BurgerIngredientsStyle.ingredients}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={() => handleTabClick("buns", bunsRef.current!)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => handleTabClick("sauce", sauceRef.current!)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => handleTabClick("main", mainRef.current!)}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={BurgerIngredientsStyle.ingredients__menuContainer}
        ref={selectedDiv}
        onScroll={handleTabs}
      >
        <h2 className="text text_type_main-medium mb-6 mt-10" ref={bunsRef}>
          Булки
        </h2>
        <ul className={BurgerIngredientsStyle.ingredients__list}>
          {bunsArray.map((card: TBasketCard) => burgerIngredient(card))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10" ref={sauceRef}>
          Соусы
        </h2>
        <ul className={BurgerIngredientsStyle.ingredients__list}>
          {sauceArray.map((card: TBasketCard) => burgerIngredient(card))}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10" ref={mainRef}>
          Начинки
        </h2>
        <ul className={BurgerIngredientsStyle.ingredients__list}>
          {mainArray.map((card: TBasketCard) => burgerIngredient(card))}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
