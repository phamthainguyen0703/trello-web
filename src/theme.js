import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
// import { cyan, deepOrange, orange, teal } from "@mui/material/colors";

// A custom theme for this app
const theme = extendTheme({
  trello: {
    appBarHeight: "58px",
    boardBarHeight: "60px",
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: {
  //         main: "#009688",
  //         secondary: "#ff5722",
  //       },
  //     },
  //   },
  //   dark: {
  //     palette: {
  //       primary: {
  //         main: "#00bcd4",
  //         secondary: "#ff9800",
  //       },
  //     },
  //   },
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb ": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover ": {
            backgroundColor: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          "& fieldset": {
            borderWidth: "0.5px !important",
          },
          "&:hover fieldset": {
            borderWidth: "1px !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px !important",
          },
        },
      },
    },
  },
});
export default theme;
