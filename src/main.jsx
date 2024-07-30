import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import StateContext from "./context/StateContext";

const theme = createTheme({
  primary: {
    main: "#E0C2FF",
    light: "#F5EBFF",
    contrastText: "#47008F",
  },
  secondary: {
    main: "#f9393211",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateContext>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </StateContext>
  </React.StrictMode>
);
