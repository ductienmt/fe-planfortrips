import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../client/pages/Homepage/LandingPage";
import Login from "../client/pages/Auth/Login/Login";
import { ClientLayout } from "../layout/ClientLayout";
import Register from "../client/pages/Auth/Register/Register";
import PlanBefore from "../client/pages/PlanBefore/Plan";
import TravelPlan from "../client/pages/PlanAfter/TravelPlan";
import Hotel from "../client/pages/HotelPage/Hotel/Hotel";
import Booking from "../client/pages/Booking/Booking";
import Payment from "../client/pages/Payment/Payment";
import Success from "../client/pages/Payment/Status/Success";
import BookingHotel from "../client/pages/HotelPage/BookingHotel/BookingHotel";
import HotelDetails from "../client/pages/HotelPage/HotelDetails/HotelDetails";
// import { EnterpriseLayout } from "../layout/EnterpriseLayout";
import Profile from "../client/pages/Profile/Profile";
import LoginAdmin from "../admin/pages/Auth/Login";
import Exchange from "../admin/pages/Exchange/Exchange";
import EnterpriseAdmin from "../admin/pages/Enterprise/EnterpriseManager";
import CouponAdmin from "../admin/pages/Coupon/Coupon";
import TravelAdmin from "../admin/pages/Travel/Travel";
import LayoutAdmin from "../admin/pages/Layout/Layout";
import HomePage from "../admin/pages/Dashboard/HomePage";
import TransportSelectionPage from "../client/pages/VehiclePage/BookingVehiclesFind/TransportSelectionPage";
import SearchResults from "../client/pages/VehiclePage/BookingVehicles/SearchResults";
import BookingSteps from "../client/pages/VehiclePage/BookingVehiclesDetails/BookingSteps";
import UserManager from "../admin/pages/User/UserManager";

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
        Component: UserManager,
      },
      {
        path: "enterprise",
        Component: EnterpriseAdmin,
      },
      {
        path: "vouchers",
        Component: CouponAdmin,
      },
      {
        path: "transactions",
        Component: Exchange,
      },
      {
        path: "travel",
        Component: TravelAdmin,
      },
    ],
  },
  {
    path: "/admin/login",
    Component: LoginAdmin,
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
        path: "/plan",
        Component: PlanBefore,
      },
      {
        path: "/plan/trip",
        Component: TravelPlan,
      },
      {
        path: "/hotel",
        Component: Hotel,
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
        path: "/booking-hotel",
        Component: BookingHotel,
      },
      {
        path: "/hotel-details",
        Component: HotelDetails,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/vehicle",
        Component: TransportSelectionPage,
      },
      {
        path: "/booking-vehicle",
        component: SearchResults,
      },
      {
        path: "/vehicle-details/:id",
        component: BookingSteps,
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    Component: App,
    children: [...routeAdmin(), ...routeClient()],
  },
]);
