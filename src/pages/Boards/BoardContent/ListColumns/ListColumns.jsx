import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function ListColumns() {
  return (
    <Box
      sx={{
        backgroundColor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar-track": {
          m: 2,
        },
      }}
    >
      <Column />
      <Column />
      <Column />

      {/* box add new column */}
      <Box
        sx={{
          backgroundColor: "#ffffff3d",
          minWidth: "300px",
          maxWidth: "300px",
          ml: 2,
          borderRadius: "12px",
          height: "fit-content",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: "white",
            width: "100%",
            justifyContent: "flex-start",
            pl: 2.5,
            py: 1,
            borderRadius: "12px",
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  );
}

export default ListColumns;
