import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep, isEmpty } from "lodash";

import { arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  // rectIntersection,
  getFirstCollision,
  // closestCenter,
} from "@dnd-kit/core";
import { Container } from "@mui/material";
import { generatePlaceholderCard } from "~/utils/formatters";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: " ACTIVE_DRAG_ITEM_TYPE-COLUMN",
  CARD: " ACTIVE_DRAG_ITEM_TYPE-CARD",
};

function BoardContent({ board }) {
  //fix trường hợp click bị gọi event(drag và move 10px thì mới gọi event)
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10,
  //   },
  // });
  // Require the mouse to move by 10 pixels before activating
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  // Press delay of 250ms, with tolerance of 500px of movement
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  // ưu tiên dùng kết hợp 2 loại mouse, touch sensor để có trải nghiệm trên mobile tốt nhất
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumnState, setOrderedColumnState] = useState([]);
  // tại 1 thời điểm chỉ có 1 item đang đc kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  // điểm va chạm cuối cùng trước đó
  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderedColumnState(
      mapOrder(board?.columns, board?.columnOrderIds, "_id")
    );
  }, [board]);

  //find column theo card id
  const findColumnByCardId = (cardId) => {
    return orderedColumnState.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };
  // cập nhật lại state trong trường hợp move card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumnState((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );

      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.card?.length + 1;

      const nextColumns = cloneDeep(prevColumns);

      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );

      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      //column cũ
      if (nextActiveColumn) {
        //xoa card tại column active hiện tại
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // thêm placeholder card nếu column rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        //cập nhật lại mảng cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }
      //column mới
      if (nextOverColumn) {
        // kiểm tra card đang kéo có tồn tại  ở overColumn chưa, nếu có thì xóa
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // cập nhật data columnId trong card sau khi kéo tha giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        // thêm card đang kéo cào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );
        // xóa placeholder card đi nếu đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        //cập nhật lại mảng cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      return nextColumns;
    });
  };

  //khi bắt đầu kéo 1 item
  function handleDragStart(event) {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    // nếu kéo card thì thực hiện set giá trị cho oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  }
  //trigger trong quá trình kéo item
  const handleDragOver = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = e;

    if (!active || !over) return;

    //activeDraggingCardId: là card đang đc kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    //overCardId: là card tương tác vs card đăng đc kéo
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!overColumn || !activeColumn) return;

    if (overColumn._id !== activeColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  //khi thả 1 item
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || !over) return;

    // xử lí kéo thả cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //activeDraggingCardId: là card đang đc kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      //overCardId: là card tương tác vs card đăng đc kéo
      const { id: overCardId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!overColumn || !activeColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        //kéo thả card trong cùng 1 column
        //lấy vị trí cũ (từ oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (card) => card._id === activeDragItemId
        );
        //lấy vị trí cũ (từ over)
        const newCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        setOrderedColumnState((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          );
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);
          return nextColumns;
        });
      }
    }

    // xử lí kéo thả columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //lấy vị trí cũ (từ active)
        const oldColumnIndex = orderedColumnState.findIndex(
          (column) => column._id === active.id
        );
        //lấy vị trí cũ (từ over)
        const newColumnIndex = orderedColumnState.findIndex(
          (column) => column._id === over.id
        );
        const dndOrderedColumn = arrayMove(
          orderedColumnState,
          oldColumnIndex,
          newColumnIndex
        );

        // const dndOrderedColumnIds = dndOrderedColumn.map((column) => column._id )

        setOrderedColumnState(dndOrderedColumn);
      }
    }

    // những data sau khi kéo thả luôn phải đưa giá trị null ban đầu
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  //args = arguments = các đối số , tham số
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      //tìm các điểm giao nhau, va chạm(intersection với con trỏ )
      const pointerIntersection = pointerWithin(args);

      // fix triệt để bug flickering => nếu pointerIntersection là mảng rỗng, return luôn kh làm gì next
      if (!pointerIntersection?.length) return;

      // const intersection = !!pointerIntersection?.length
      //   ? pointerIntersection
      //   : rectIntersection(args);

      //tìm overId đầu tiền trong intersection
      let overId = getFirstCollision(pointerIntersection, "id");
      if (overId) {
        // nếu overId là column thì sẽ tìm đến cardid gần nhất bên trong khu vực va chạm
        const checkColumn = orderedColumnState.find(
          (column) => column._id === overId
        );
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (Container) =>
                Container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(Container.id)
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }
      //nếu overId = null thì trả về array rỗng tránh crash page
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType]
  );

  return (
    <DndContext
      sensors={sensors}
      //"Thuật Toán Phát Hiện Va Chạm" - "Collision Detection Algorithms"  fix lỗi card cover lớn sẽ không thể kéo qua column

      // nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu
      // tự custom nâng cao thuật toán phát hiện va chạm để fix
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumnState} />
        <DragOverlay
          dropAnimation={{
            duration: 500,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            sideEffects: defaultDropAnimationSideEffects({
              styles: { active: { opacity: 0.5 } },
            }),
          }}
        >
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
