import "./App.css";
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
    // <>
    //   <SnackbarProvider
    //     maxSnack={3}
    //     anchorOrigin={{
    //       vertical: "top",
    //       horizontal: "right",
    //     }}
    //   >
    //     <DashboardLayoutBasic />
    //   </SnackbarProvider>
    // </>
  );
}

export default App;
