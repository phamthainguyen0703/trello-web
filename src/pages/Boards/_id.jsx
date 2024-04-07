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

// import { mockData } from "~/apis/mock-data";
import {
  fetchBoardDetailsAPI,
  CreateNewColumnApi,
  CreateNewCardApi,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
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
      columnToUpdate.cards.push(createdCard);
      columnToUpdate.cardOrderIds.push(createdCard._id);
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
        <Typography>Loading Board...</Typography>
      </Box>
    );
  }

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
      />
    </Container>
  );
}
export default Board;
