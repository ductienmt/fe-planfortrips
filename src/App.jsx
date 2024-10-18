import "./App.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./client/pages/HomePage/HomePage";
import TravelPlan from "./client/pages/Plan/TravelPlan";
import Hotel from "./client/pages/Hotel/Hotel"; // Sửa lại chỉ nhập một lần
import BookingHotel from "./client/pages/Hotel/BookingHotel/BookingHotel";
import HotelInfo from "./client/pages/Hotel/HotelDetails/HotelInfo";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Bọc các route bằng SnackbarProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/plan" element={<TravelPlan />} />
            <Route path="/" element={<Hotel />} />
            <Route path="/BookingHotel" element={<BookingHotel />} />
            <Route path="/HotelInfo" element={<HotelInfo />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
