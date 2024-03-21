import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Tooltip } from "@mui/material";
import { capitalizeFirstLetter } from "~/utils/formatters";

const MENU_STYLES = {
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    backgroundColor: "primary.50",
  },
};

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" },
          }}
          variant="outlined"
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": { backgroundColor: "#a4b0be" },
            },
          }}
        >
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
          <Tooltip title="phamthainguyen">
            <Avatar
              alt="phamthainguyen"
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/285130856_1626334954403527_6145133732000066475_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXfcONFT6Y7-S0J9YOrzSrPMDUUMGMtzY8wNRQwYy3NuNFsWeqEyFsh-zFaMpgcnR94EbrT0mtspKrxD1gihxE&_nc_ohc=ALFoWdXikaUAX9Uas8o&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDWSKZssbP3IgaY3w5wsUbk37g0DLbNoAVyDpLUEXfljQ&oe=65FE6F43"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
