// App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Hotel from "./pages/Client/Hotel/Hotel"; // Sửa lại chỉ nhập một lần
import BookingHotel from "./pages/Client/Hotel/BookingHotel/BookingHotel";
import HotelInfo from "./pages/Client/Hotel/HotelDetails/HotelInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hotel />} />
        <Route path="/BookingHotel" element={<BookingHotel />} />
        <Route path="/HotelInfo" element={<HotelInfo />} />
      </Routes>
    </>
  );
}

export default App;
