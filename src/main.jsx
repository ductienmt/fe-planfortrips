import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingSteps from "./client/pages/VehiclePage/BookingVehiclesDetails/BookingSteps";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookingSteps />
  </React.StrictMode>
);

