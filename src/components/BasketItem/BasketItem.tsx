import React from "react";
import BasketStyles from "./BasketItem.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { useDispatch } from "../../services/hooks";

import { TBasketCard } from "../../types";

import {
  moveConstructorItem,
  deleteConstructorItem,
} from "../../services/actions/burgerConstructor";

interface IBasketItem {
  card: TBasketCard;
  index: number;
}

type FC<P> = React.FunctionComponent<P>;

const BasketItem: FC<IBasketItem> = (props: IBasketItem) => {
  
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLLIElement>(null);
  const cardData: TBasketCard = props.card;

  const [, dropTarget] = useDrop({
    accept: "draggedIngr",
    hover(item: { index: number}, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex: number | undefined = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
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

  function handleDeleteItem(index: number) {
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
        text={cardData.name!}
        price={cardData.price!}
        thumbnail={cardData.image!}
        handleClose={() => handleDeleteItem(props.index)}
      />
    </li>
  );
}

export default BasketItem;
