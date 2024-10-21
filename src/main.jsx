import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingHotel from "./client/pages/HotelPage/BookingHotel/BookingHotel";
import HotelDetails from "./client/pages/HotelPage/HotelDetails/HotelDetails";
import Hotel from "./client/pages/HotelPage/Hotel/Hotel";
import TripSearch from "./client/pages/VehiclePage/BookingVehicle/Tripsearch";
import SearchResults from "./client/pages/VehiclePage/BookingVehicles/SearchResults";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchResults />
  </React.StrictMode>
);


