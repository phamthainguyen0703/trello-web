import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep } from "lodash";

import { arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

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

  useEffect(() => {
    setOrderedColumnState(
      mapOrder(board?.columns, board?.columnOrderIds, "_id")
    );
  }, [board]);

  //fine column theo card id
  const findColumnByCardId = (cardId) => {
    return orderedColumnState.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
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

          // thêm card đang kéo cào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          );

          //cập nhật lại mảng cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          );
        }

        return nextColumns;
      });
    }
  };

  //khi thả 1 item
  const handleDragEnd = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log("handleDragEnd: ", e);
    }

    const { active, over } = e;

    if (!over) return;
    if (active.id !== over.id) {
      //lấy vị trí cũ (từ active)
      const oldIndex = orderedColumnState.findIndex(
        (column) => column._id === active.id
      );
      //lấy vị trí cũ (từ over)
      const newIndex = orderedColumnState.findIndex(
        (column) => column._id === over.id
      );
      const dndOrderedColumn = arrayMove(
        orderedColumnState,
        oldIndex,
        newIndex
      );

      // const dndOrderedColumnIds = dndOrderedColumn.map((column) => column._id )

      setOrderedColumnState(dndOrderedColumn);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
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
