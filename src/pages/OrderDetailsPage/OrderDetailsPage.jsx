import OrderDetailsStyles from "./OrderDetailsPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import { useSelector } from "../../services/hooks";

function OrderDetailsPage() {
  return (
    <div className={`${OrderDetailsStyles.container}`}>
      <h2
        className={`${OrderDetailsStyles.orderNumber} text text_type_digits-default mt-10 mb-10`}
      >
        #034533
      </h2>
      <h3 className="text text_type_main-medium mt-5 mb-5">
        Black Hole Singularity острый бургер
      </h3>
      <p
        className={`${OrderDetailsStyles.statusText} text text_type_main-small mb-15`}
      >
        Выполнен
      </p>
      <p className="text text_type_main-medium mb-7">Состав:</p>
      <ul className={`${OrderDetailsStyles.list} mb-15`}>
        <li className={OrderDetailsStyles.listItem}>
          <img src={""} className={OrderDetailsStyles.image} alt={"lol"} />
          <div className={OrderDetailsStyles.dataContainer}>
            <p
              className={`${OrderDetailsStyles.ingrName} text text_type_main-default`}
            >
              Флюоресцентная булка R2-D3
            </p>
            <p
              className={`${OrderDetailsStyles.ingrAmount} text text_type_main-default`}
            >
              2x30
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </li>
      </ul>
      <div className={OrderDetailsStyles.textContainer}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </p>
        <p className="text text_type_main-medium">
          510 <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
