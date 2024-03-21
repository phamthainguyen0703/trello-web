import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";

import { arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

function BoardContent({ board }) {
  //fix trường hợp click bị gọi event(drag và move 10px thì mới gọi event)
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
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

  useEffect(() => {
    setOrderedColumnState(
      mapOrder(board?.columns, board?.columnOrderIds, "_id")
    );
  }, [board]);

  const handDragEnd = (e) => {
    console.log("handDragEnd: ", e);
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
  };
  return (
    <DndContext onDragEnd={handDragEnd} sensors={sensors}>
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
      </Box>
    </DndContext>
  );
}
export default BoardContent;
