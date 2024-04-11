import React from "react";
import App from "~/App.jsx";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme";

// cấu hình react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ConfirmProvider } from "material-ui-confirm";

// cấu hình material-ui Dialog
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider>
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-left" theme="colored" />
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
);
