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

const MENU_STYLES = {
  color: "primary.main",
  backgroundColor: "white",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    backgroundColor: "primary.50",
  },
};

const BoardBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        paddingX: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        borderTop: "1px solid #00bfa5",
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
          label="PhamThaiNguyen MERN Stack Board"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
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
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
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
};

export default BoardBar;
