import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TravelPlan from "./client/pages/PlanAfter/TravelPlan";
import Login from "./client/pages/Auth/Login/Login";
import Register from "./client/pages/Auth/Register/Register";
import Footer from "./client/pages/Footer/Footer";
import Header from "./client/pages/Header/Header";
import { SnackbarProvider } from "notistack";
import Hotel from "./client/pages/HotelPage/Hotel/Hotel";
import BookingHotel from "./client/pages/HotelPage/BookingHotel/BookingHotel";
import HotelDetails from "./client/pages/HotelPage/HotelDetails/HotelDetails";
import LandingPage from "./client/pages/Homepage/LandingPage";
import PlanBefore from "./client/pages/PlanBefore/Plan";
import Booking from "./client/pages/Booking/Booking";
import Payment from "./client/pages/Payment/Payment";


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
        {window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" && <Header />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plan" element={<PlanBefore />} />
          <Route path="/plan/trip" element={<TravelPlan />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/booking-hotel/:hotel_id" element={<BookingHotel />} />
          <Route path="/hotel-info/:room_id" element={<HotelDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:type" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        {window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/plan" &&
          window.location.pathname !== "/plan/trip" && <Footer />}
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
