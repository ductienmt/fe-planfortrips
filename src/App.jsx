import "./App.css";

import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
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
import Success from "./client/pages/Payment/Status/Success";
import { ClientLayout } from "./layout/ClientLayout";
import DashboardLayoutBasic from "./admin/pages/Layout/DashboardLayoutBasic";

function App() {
  const location = useLocation();

  // Danh sách các path mà không cần hiện Header hoặc Footer
  const noHeaderFooterPaths = ["/enterprise", "/enterprise/test"];
  const noFooterPaths = ["/plan", "/plan/trip", "/login", "/register", "/enterprise/test"];

  const shouldShowHeader = !noHeaderFooterPaths.includes(location.pathname);
  const shouldShowFooter =
    !noHeaderFooterPaths.includes(location.pathname) &&
    !noFooterPaths.includes(location.pathname);

  return (
    // <SnackbarProvider
    //   maxSnack={3}
    //   anchorOrigin={{
    //     vertical: "top",
    //     horizontal: "right",
    //   }}
    // >
    //   {shouldShowHeader && <Header />}
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/plan" element={<PlanBefore />} />
    //     <Route path="/plan/trip" element={<TravelPlan />} />
    //     <Route path="/hotel" element={<Hotel />} />
    //     <Route path="/booking-hotel" element={<BookingHotel />} />
    //     <Route path="/hotel-details" element={<HotelDetails />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/booking/:type" element={<Booking />} />
    //     <Route path="/payment" element={<Payment />} />
    //     <Route path="/success" element={<Success />} />
    //   </Routes>
    //   {shouldShowFooter && <Footer />}
    // </SnackbarProvider>
    // admin 
    <DashboardLayoutBasic/>
  );
}

export default App;
