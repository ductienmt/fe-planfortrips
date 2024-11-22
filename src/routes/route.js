import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../client/pages/Homepage/LandingPage";
import Login from "../client/pages/Auth/Login/Login";
import { ClientLayout } from "../layout/ClientLayout";
import Register from "../client/pages/Auth/Register/Register";
import PlanBefore from "../client/pages/PlanBefore/Plan";
import TravelPlan from "../client/pages/PlanAfter/TravelPlan";
import Booking from "../client/pages/Booking/Booking";
import Payment from "../client/pages/Payment/Payment";
import Success from "../client/pages/Payment/Status/Success";
import Profile from "../client/pages/Profile/Profile";

// import LoginAdmin from "../admin/pages/Auth/Login";
// import UserAdmin from "../admin/pages/User/User";
import EnterpriseAdmin from "../admin/pages/Enterprise/Enterprise";
import LayoutAdmin from "../admin/pages/Layout/Layout";
import HomePage from "../admin/pages/Dashboard/HomePage";
import CouponAdmin from "../admin/pages/Coupon/CouponPage";
import OrderCarPage from "../admin/pages/Exchange/OrderCar/OrderCar";
import BookingHotelPage from "../admin/pages/Exchange/BookingHotel/BookingHotel";
import LoginAdmin from "../admin/pages/Auth/Login/Login";
import FeedbackPage from "../admin/pages/Feedback/Feedback";
import TransportSelectionPage from "../client/pages/VehiclePage/BookingVehiclesFind/TransportSelectionPage";
import SearchResults from "../client/pages/VehiclePage/BookingVehicles/SearchResults";
import BookingSteps from "../client/pages/VehiclePage/BookingVehiclesDetails/BookingSteps";
import ProfileDetail from "../client/pages/Profile/ProfileDetail/ProfileDetail";
import ChangePassword from "../client/pages/Profile/ChangePass/ChangePassword";
import InfoDetails from "../client/pages/Profile/InfoDetails/InfoDetails";
import YourTripsQuery from "../client/pages/Profile/YourTripQuery/YourTripsQuery";
import PlacePageAdmin from "../admin/pages/Travel/PlacePage";
import { EnterpriseLayout } from "../layout/EnterpriseLayout";
import EnterpriseLogin from "../enterprise/auth/login/EnterpriseLogin";
// import EnterpriseDashboard from "../enterprise/dashboard/EnterpriseDashboard";
// import Hotel from "../client/pages/HotelPage/Hotel/Hotel";
import Voucher from "../enterprise/voucher/Voucher";
import Vehicle from "../enterprise/transportation/vehicleManagement/Vehicle";
import Schedule from "../enterprise/transportation/schedule/Schedule";
import Route from "../enterprise/transportation/route/Route";
import Room from "../enterprise/accomodation/roomManagement/Room";
import HotelManagement from "../enterprise/accomodation/manager/HotelManagement";

import Sumbitenterprise from "../client/pages/Enterprise/Sumbitenterprise";
import TourAdmin from "../admin/pages/Tour/TourPage";
import GuestLiving from "../enterprise/accomodation/guest/GuestLiving";
import RoomVoucher from "../enterprise/accomodation/roomVoucher/roomVoucher";
import ChooseHotel from "../enterprise/accomodation/chooseHotel/chooseHotel";
import AccomodationDashboard from "../enterprise/dashboard/Accomodation/AccomodationDashboard";
import TranportatinDashboard from "../enterprise/dashboard/tranportation/TranportatinDashboard";
import Hotelpage from "../client/pages/HotelPage/Hotelpage";
import { BookingHotel } from "../client/pages/HotelPage/BookingHotel";
import Checkinpage from "../client/pages/Checkin/Checkinpage";
import User from "../admin/pages/User/User";
import Failed from "../client/pages/Payment/Status/Failed";

const routeAdmin = () => [
  {
    path: "/admin",
    Component: LayoutAdmin,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "users",
        Component: User,
      },
      {
        path: "business",
        Component: EnterpriseAdmin,
      },
      {
        path: "tours",
        Component: TourAdmin,
      },
      {
        path: "vouchers",
        Component: CouponAdmin,
      },
      {
        path: "transactions/hotels",
        Component: BookingHotelPage,
      },
      {
        path: "transactions/vehicles",
        Component: OrderCarPage,
      },

      {
        path: "travel",
        Component: PlacePageAdmin,
      },
      {
        path: "feedbacks",
        Component: FeedbackPage,
      },
    ],
  },
  {
    path: "/admin/login",
    Component: LoginAdmin,
  },
];

const routeEnterprise = () => [
  {
    path: "/enterprise",
    Component: EnterpriseLayout,
    children: [
      {
        path: "login",
        Component: EnterpriseLogin,
      },
      {
        path: "accomodation/dashboard",
        Component: AccomodationDashboard,
      },
      {
        path: "transportation/dashboard",
        Component: TranportatinDashboard,
      },
      {
        path: ":type/vouchers",
        Component: Voucher,
      },
      {
        path: "transportation/vehicle-management",
        Component: Vehicle,
      },
      {
        path: "transportation/schedule",
        Component: Schedule,
      },
      {
        path: "transportation/routes",
        Component: Route,
      },
      {
        path: "accomodation/room-management",
        Component: Room,
      },
      {
        path: "accomodation/accomodation-manager",
        Component: HotelManagement,
      },
      {
        path: "accomodation/guest-manager",
        Component: GuestLiving,
      },
      {
        path: "accomodation/voucher-manager",
        Component: RoomVoucher,
      },
      {
        path: "accomodation/choose-hotel",
        Component: ChooseHotel,
      },
    ],
  },
];

const routeClient = () => [
  {
    path: "/",
    Component: ClientLayout,
    children: [
      {
        path: "",
        Component: LandingPage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/hotel",
        Component: Hotelpage,
      },
      {
        path: "/booking-hotel",
        Component: BookingHotel,
      },
      {
        path: "/plan",
        Component: PlanBefore,
      },
      {
        path: "/plan/trip",
        Component: TravelPlan,
      },
      {
        path: "/booking/:type",
        Component: Booking,
      },
      {
        path: "/payment",
        Component: Payment,
      },
      {
        path: "/success",
        Component: Success,
        exact: true,
      },
      {
        path: "/failed",
        Component: Failed,
      },
      {
        path: "/profile",
        Component: Profile,
        children: [
          {
            path: "",
            Component: ProfileDetail,
          },
          {
            path: "change-password",
            Component: ChangePassword,
          },
          {
            path: "detail",
            Component: InfoDetails,
          },
          {
            path: "trip",
            Component: YourTripsQuery,
          },
          // {
          //   path: "trip-save",
          //   Component: YourSavedTrips, // Ensure you have this component
          // },
        ],
      },
      // {
      //   path: "/vehicle",
      //   Component: TransportSelectionPage,
      // },
      {
        path: "/booking-vehicle",
        Component: SearchResults,
      },
      {
        path: "/vehicle-details/:id",
        Component: BookingSteps,
      },

      {
        path: "/submit-enterprise",
        Component: Sumbitenterprise,
      },
      {
        path: "/check-in",
        Component: Checkinpage,
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    Component: App,
    children: [...routeAdmin(), ...routeClient(), ...routeEnterprise()],
  },
]);
