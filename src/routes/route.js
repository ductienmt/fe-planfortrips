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
import Profile from "../client/pages/Profile/Profile";
// import LoginAdmin from "../admin/pages/Auth/Login";
import UserAdmin from "../admin/pages/User/User";
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
import EnterpriseDashboard from "../enterprise/dashboard/EnterpriseDashboard";


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
        Component: UserAdmin,
      },
      {
        path: "business",
        Component: EnterpriseAdmin,
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
        path: "dashboard",
        Component: EnterpriseDashboard,
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
      {
        path: "/vehicle",
        Component: TransportSelectionPage,
      },
      {
        path: "/booking-vehicle",
        Component: SearchResults,
      },
      {
        path: "/vehicle-details",
        Component: BookingSteps,
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
