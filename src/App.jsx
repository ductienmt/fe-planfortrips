import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./client/pages/HomePage/HomePage";
import TravelPlan from "./client/pages/Plan/TravelPlan";
import Hotel from "./client/pages/Hotel/Hotel";
import BookingHotel from "./client/pages/Hotel/BookingHotel/BookingHotel";
import HotelInfo from "./client/pages/Hotel/HotelDetails/HotelInfo";
import Login from "./client/pages/Auth/Login/Login";
import Register from "./client/pages/Auth/Register/Register";
import Footer from "./client/pages/Footer/Footer";
import Header from "./client/pages/Header/Header";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <BrowserRouter>
        {window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" && <Header />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan" element={<TravelPlan />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/booking-hotel" element={<BookingHotel />} />
          <Route path="/hotel-info" element={<HotelInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/" && <Footer />}
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
