import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
