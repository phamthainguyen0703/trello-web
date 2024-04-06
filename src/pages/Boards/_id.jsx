import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";

// import { mockData } from "~/apis/mock-data";
import {
  fetchBoardDetailsAPI,
  CreateNewColumnApi,
  CreateNewCardApi,
} from "~/apis";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // tạm thời fix cứng boardId
    const boardId = "660c1140e08d94a492c2131a";
    //Call Api
    fetchBoardDetailsAPI(boardId).then((board) => {
      //xử lí vấn đề kéo thả trong column rỗng
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
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

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  );
}
export default Board;
