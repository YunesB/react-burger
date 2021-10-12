import React from "react";
import BasketStyles from "./BasketItem.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import propTypes from "../../utils/propTypes";

import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  moveConstructorItem,
  deleteConstructorItem,
} from "../../services/actions/burgerConstructor";

function BasketItem(props) {
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const cardData = props.card;

  const [, dropTarget] = useDrop({
    accept: "draggedIngr",
    item: props.card,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveConstructorItem(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: "draggedIngr",
    item: () => {
      return { card: props.card, index: props.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  dragRef(dropTarget(ref));

  function handleDeleteItem(index) {
    dispatch(deleteConstructorItem(index));
  }

  return (
    <li
      className={`${BasketStyles.basketItem__listItem} mb-4 mr-2`}
      ref={ref}
      style={{ opacity: opacity }}
    >
      <div className={BasketStyles.iconBox}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={cardData.name}
        price={cardData.price}
        thumbnail={cardData.image}
        handleClose={() => handleDeleteItem(props.index)}
      />
    </li>
  );
}

BasketItem.propTypes = {
  card: PropTypes.shape(propTypes).isRequired,
};

export default BasketItem;
