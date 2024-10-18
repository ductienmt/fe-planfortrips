import "./App.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TravelPlan from "./pages/Plan/TravelPlan";
import { Routes, Route } from "react-router-dom";
import Hotel from "./pages/Client/Hotel/Hotel"; // Sửa lại chỉ nhập một lần
import BookingHotel from "./pages/Client/Hotel/BookingHotel/BookingHotel";
import HotelInfo from "./pages/Client/Hotel/HotelDetails/HotelInfo";
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Login/Register';
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
           <Route path="/footer" element={<Footer />} />
      <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}


export default App;
