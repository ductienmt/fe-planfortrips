import { createBrowserRouter, Route } from "react-router-dom";
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
import LoginAdmin from "../admin/pages/Auth/Login";
// import Exchange from "../admin/pages/Exchange/Exchange";
import UserAdmin from "../admin/pages/User/User";
import EnterpriseAdmin from "../admin/pages/Enterprise/Enterprise";
// import CouponAdmin from "../admin/pages/Coupon/Coupon";
import TravelAdmin from "../admin/pages/Travel/Travel";
import LayoutAdmin from "../admin/pages/Layout/Layout";
import HomePage from "../admin/pages/Dashboard/HomePage";
import TransportSelectionPage from "../client/pages/VehiclePage/BookingVehiclesFind/TransportSelectionPage";
import SearchResults from "../client/pages/VehiclePage/BookingVehicles/SearchResults";
import BookingSteps from "../client/pages/VehiclePage/BookingVehiclesDetails/BookingSteps";
import ProfileDetail from "../client/pages/Profile/ProfileDetail/ProfileDetail";
import ChangePassword from "../client/pages/Profile/ChangePass/ChangePassword";
import InfoDetails from "../client/pages/Profile/InfoDetails/InfoDetails";
import YourTripsQuery from "../client/pages/Profile/YourTripQuery/YourTripsQuery";
import { EnterpriseLayout } from "../layout/EnterpriseLayout";
import EnterpriseLogin from "../enterprise/auth/login/EnterpriseLogin";
import EnterpriseDashboard from "../enterprise/dashboard/EnterpriseDashboard";
import Voucher from "../enterprise/voucher/Voucher";
import Vehicle from "../enterprise/transportation/vehicleManagement/Vehicle";

import RoomHistory from "../enterprise/accomodation/roomHistory/RoomHistory";
import Room from "../enterprise/accomodation/roomManagement/Room";
import HotelManagement from "../enterprise/accomodation/manager/HotelManagement";
import Sumbitenterprise from "../client/pages/Enterprise/Sumbitenterprise";
import Account from "../enterprise/transportation/account/Account";
import Schedules from "../enterprise/transportation/schedules/Schedules"
import TransportationVouchers from "../enterprise/voucher/transportation/TransportationVouchers";
import schedules from "../enterprise/transportation/schedules/Schedules";
import Seats from "../enterprise/transportation/seats/Seats";
import Guest from "../enterprise/transportation/guest/Guest";
import Routehotel from "../enterprise/transportation/routehotel/Routehotel";


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
      // {
      //   path: "vouchers",
      //   Component: CouponAdmin,
      // },
      // {
      //   path: "transactions",
      //   Component: Exchange,
      // },
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
        path: ":type/dashboard",
        Component: EnterpriseDashboard,
      },
      {
        path: ":type/vouchers",
        Component: Voucher,
      },
       

      {
        path: "transportation/vehicle-schedules",
        Component: Schedules,
      },
      {
        path: "transportation/Seats",
        Component: Seats,
      },
      {
        path: "transportation/vehicle-management",
        Component: Vehicle,
      },
      
      {
        path: "transportation/vehicle-account",
        Component: Account,
      },
      {
        path: "transportation/Guest",
        Component: Guest,
      },
    
    
      
      {
        path: "transportation/vouchers",
        Component: TransportationVouchers,
      },
      {
        path: "transportation/Routehotel",
        Component: Routehotel,
      },
      {
        path: "transportation/schedules",
        Component: schedules,
      },
      {
        path: "accomodation/room-history",
        Component: RoomHistory,
      },
      {
        path: "accomodation/room-management",
        Component: Room,
      },
      {
        path: "accomodation/accomodation-manager",
        Component: HotelManagement,
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
      {
        path: "/submit-enterprise",
        Component: Sumbitenterprise,
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
