import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListColumns({ columns }) {
  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
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
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

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
    </SortableContext>
  );
}

export default ListColumns;
