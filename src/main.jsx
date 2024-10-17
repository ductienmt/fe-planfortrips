import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Hotel from "./pages/Client/Hotel/Hotel.jsx"
import HotelInfo from "./pages/Client/Hotel/HotelDetails/HotelInfo.jsx";
import HotelDetails from "./pages/Client/Hotel/HotelDetails/HotelDetails.jsx";
import BookingHotelHotelInfo from "./pages/Client/Hotel/BookingHotel/BookingHotelHotelInfo.jsx";
import BookingHotel from "./pages/Client/Hotel/BookingHotel/BookingHotel.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookingHotel />
  </StrictMode>
);
