import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./client/pages/Auth/Login/Login";
import Register from "./client/pages/Auth/Register/Register";
import Footer from "./client/pages/Footer/Footer";
import Header from "./client/pages/Header/Header";
import { SnackbarProvider } from "notistack";
import Hotel from "./client/pages/HotelPage/Hotel/Hotel";
import BookingHotel from "./client/pages/HotelPage/BookingHotel/BookingHotel";
import TravelPlan from "./client/pages/PlanAfter/TravelPlan";
import HotelDetails from "./client/pages/HotelPage/HotelDetails/HotelDetails";
import LandingPage from "./client/pages/Homepage/LandingPage";
import PlanBefore from "./client/pages/PlanBefore/Plan";
import Booking from "./client/pages/Booking/Booking";
import Payment from "./client/pages/Payment/Payment";
import HomePage from "./client/pages/PlanBefore/Plan";
import SearchResults from "./client/pages/VehiclePage/BookingVehicles/SearchResults";
import BookingSteps from "./client/pages/VehiclePage/BookingVehiclesDetails/BookingSteps";
import TransportSelectionPage from "./client/pages/VehiclePage/BookingVehiclesFind/TransportSelectionPage";

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

          <Route path="/" element={<HomePage />} />
          <Route path="/plan" element={<TravelPlan />} /> *

          <Route path="/" element={<LandingPage />} />
          <Route path="/plan" element={<PlanBefore />} />
          <Route path="/plan/trip" element={<TravelPlan />} />

          <Route path="/vehicle" element={<TransportSelectionPage />} />
          <Route path="/booking-vehicle" element={<SearchResults />} />
          <Route path="/vehicle-details" element={<BookingSteps />} />

          <Route path="/hotel" element={<Hotel />} />
          <Route path="/booking-hotel" element={<BookingHotel />} />
          <Route path="/hotel-details" element={<HotelDetails />} />
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