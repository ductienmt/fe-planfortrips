import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookingHotel from "./client/pages/HotelPage/BookingHotel/BookingHotel";
import TravelPlan from "./client/pages/PlanAfter/TravelPlan";
import Hotel from "./client/pages/HotelPage/Hotel/Hotel";
import Login from "./client/pages/Auth/Login/Login";
import Register from "./client/pages/Auth/Register/Register";
import Footer from "./client/pages/Footer/Footer";
import Header from "./client/pages/Header/Header";
import { SnackbarProvider } from "notistack";
import LandingPage from "./client/pages/Homepage/LandingPage";
import PlanBefore from "./client/pages/PlanBefore/Plan";

import HotelDetails from "./client/pages/HotelPage/HotelDetails/HotelDetails";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plan" element={<PlanBefore />} />
          <Route path="/plan/trip" element={<TravelPlan />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/booking-hotel" element={<BookingHotel />} />
          <Route path="/hotel-info" element={<HotelDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {window.location.pathname !== "/login" ||
          window.location.pathname !== "/register" ||
          window.location.pathname !== "/plan" || <Footer />}
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
