import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";
import { mapOrder } from "~/utils/sorts";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

// import { mockData } from "~/apis/mock-data";
import {
  fetchBoardDetailsAPI,
  CreateNewColumnApi,
  CreateNewCardApi,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnsAPI,
  deleteColumnDetailsAPI,
} from "~/apis";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // tạm thời fix cứng boardId
    const boardId = "660c1140e08d94a492c2131a";
    //Call Api
    fetchBoardDetailsAPI(boardId).then((board) => {
      // sắp xếp lại thứ tự các column trước khi đưa data xuống các component con(tránh bug)
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

      board.columns.forEach((column) => {
        //xử lí vấn đề kéo thả trong column rỗng
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          // sắp xếp lại thứ tự các column trước khi đưa data xuống các component con(tránh bug)
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  //call api tạo mới column và reset data state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await CreateNewColumnApi({
      ...newColumnData,
      boardId: board._id,
    });

    //xử lí vấn đề kéo thả trong column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    //cập nhật state board
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };

  //call api tạo mới card và reset data state board
  const createNewCard = async (newCardData) => {
    const createdCard = await CreateNewCardApi({
      ...newCardData,
      boardId: board._id,
    });
    //cập nhật state board
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    );
    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_placeholderCard)) {
        columnToUpdate.cards = [createdCard];
        columnToUpdate.cardOrderIds = [createdCard._id];
      } else {
        columnToUpdate.cards.push(createdCard);
        columnToUpdate.cardOrderIds.push(createdCard._id);
      }
    }
    setBoard(newBoard);
  };

  //call api xử lí khi kéo thả column
  // logic: chỉ cần cập nhật mảng columnOrderIds của board chứa (thay đổi vị trí trong mảng)
  const moveColumns = (dndOrderedColumn) => {
    // update cho chuẩn data setBoard
    const dndOrderedColumnIds = dndOrderedColumn.map((column) => column._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumn;
    newBoard.columnOrderIds = dndOrderedColumn;
    setBoard(newBoard);

    //call API update board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds,
    });
  };

  //call api xử lí khi kéo thả card trong cùng column
  // logic: chỉ cần cập nhật mảng cardOrderIds của column chứa (thay đổi vị trí trong mảng)
  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    // update cho chuẩn data setBoard
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    setBoard(newBoard);

    //call API update board
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds,
    });
  };

  // Di chuyện card giữa v column khác nhau:
  // b1: cập nhật mảng cardOrderIds của column đang chứa (xóa _id card khỏi mảng)
  // b2: cập nhật mảng cardOrderIds của column mới tiếp theo (thêm _id vào mảng)
  // b3: cập nhật lại trường columnId mới của card đã kéo
  // => làm một API support riêng

  const moveCardToDifferentColumns = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumn
  ) => {
    // update cho chuẩn data setBoard
    const dndOrderedColumnIds = dndOrderedColumn.map((column) => column._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumn;
    newBoard.columnOrderIds = dndOrderedColumnIds;
    setBoard(newBoard);

    //call api
    let prevCardOrderIds = dndOrderedColumn.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    // xử lí vấn đề khi kéo card cuối cùng ra khỏi column, column rỗng sẽ có placeholder card, cần xóa đi trước khi gửi dữ liệu cho BE
    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];

    moveCardToDifferentColumnsAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumn.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>
          Loading Board...(vì sử dụng host free nên loading hơi lâu. Xin quý vị
          nhẫn nại)
        </Typography>
      </Box>
    );
  }

  //xử lí xóa column và cards bên trong
  const deleteColumnDetails = (columnId) => {
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (_id) => _id !== columnId
    );
    setBoard(newBoard);

    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult);
    });
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumns={moveCardToDifferentColumns}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  );
}
export default Board;
