import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
