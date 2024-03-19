// boards list
import theme from "../../../theme";
import Box from "@mui/material/Box";

function BoardContent() {
  return (
    <Box
      sx={{
        height: `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
        width: "100%",
        backgroundColor: "primary.main",
        display: "flex",
        alignItems: "center",
      }}
    >
      Board content
    </Box>
  );
}

export default BoardContent;
