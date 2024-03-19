import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
// import { cyan, deepOrange, orange, teal } from "@mui/material/colors";

// A custom theme for this app

const theme = extendTheme({
  trello: {
    appBarHeight: "48px",
    boardBarHeight: "58px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#009688",
          secondary: "#ff5722",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#00bcd4",
          secondary: "#ff9800",
        },
      },
    },
  },
});
export default theme;
