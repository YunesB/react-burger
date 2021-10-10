import React from 'react';
import OrderStyles from './OrderHistory.module.css';

import { useSelector } from "react-redux";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderHistory() {

  const burgerIngredientsArray = useSelector(
    (state) => state.burgerIngredients.burgerIngredientsArray
  );

  if (burgerIngredientsArray.length === 0) {
    return <></>
  }

  return (
    <div className={OrderStyles.orderHistory}>
      <ul className={OrderStyles.list}>
        <li className={`${OrderStyles.listItem} mb-6`}>
          <div className={`${OrderStyles.textBox} mb-6`}>
            <p className='text text_type_digits-default'>#11111</p>
            <p className='text text_type_main-default text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
          </div>
          <h2 className='text text_type_main-medium mb-2'>Death Star Starship Main бургер</h2>
          <p className='text text_type_main-small mb-7'>Создан</p>
          <div className={OrderStyles.dataBox}>
            <ul className={OrderStyles.ingrList}>
              <li className={OrderStyles.ingItem}>
                <img src={burgerIngredientsArray[0].image} alt={burgerIngredientsArray[0].name} className={OrderStyles.img} />
              </li>
              <li className={OrderStyles.ingItem}>
                <img src={burgerIngredientsArray[0].image} alt={burgerIngredientsArray[0].name} className={OrderStyles.img} />
              </li>
              <li className={OrderStyles.ingItem}>
                <img src={burgerIngredientsArray[0].image} alt={burgerIngredientsArray[0].name} className={OrderStyles.img} />
              </li>
            </ul>
            <div className={OrderStyles.textContainer}>
              <p className='text text_type_digits-default mr-2'>1111</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default OrderHistory;