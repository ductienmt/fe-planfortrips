import { createBrowserRouter, Route } from "react-router-dom";
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
import ProfileDetail from "../client/pages/Profile/ProfileDetail/ProfileDetail";
import ChangePassword from "../client/pages/Profile/ChangePass/ChangePassword";
import InfoDetails from "../client/pages/Profile/InfoDetails/InfoDetails";
import YourTripsQuery from "../client/pages/Profile/YourTripQuery/YourTripsQuery";
import PlacePageAdmin from "../admin/pages/Travel/PlacePage";
import { EnterpriseLayout } from "../layout/EnterpriseLayout";
import EnterpriseLogin from "../enterprise/auth/login/EnterpriseLogin";
// import EnterpriseDashboard from "../enterprise/dashboard/EnterpriseDashboard";
import Voucher from "../enterprise/voucher/Voucher";
import Vehicle from "../enterprise/transportation/vehicleManagement/Vehicle";
import Schedule from "../enterprise/transportation/schedules/Schedules";
import RouteTrans from "../enterprise/transportation/routehotel/Routehotel";

import Room from "../enterprise/accomodation/roomManagement/Room";
import HotelManagement from "../enterprise/accomodation/manager/HotelManagement";
import Sumbitenterprise from "../client/pages/Enterprise/Sumbitenterprise";
import Tour from "../admin/pages/Tour/Tour";
import TourAdmin from "../admin/pages/Tour/TourPage";
import GuestLiving from "../enterprise/accomodation/guest/GuestLiving";
import RoomVoucher from "../enterprise/accomodation/roomVoucher/RoomVoucher";
import ChooseHotel from "../enterprise/accomodation/chooseHotel/chooseHotel";
import AccomodationDashboard from "../enterprise/dashboard/Accomodation/AccomodationDashboard";
import TranportatinDashboard from "../enterprise/dashboard/tranportation/TranportatinDashboard";
import Checkinpage from "../client/pages/Checkin/Checkinpage";
import User from "../admin/pages/User/User";
import ChooseProvinceDetail from "../client/pages/Checkin/chooseProvinceDetail/ChooseProvinceDetail";
import ChooseCheckinFollowArea from "../client/pages/Checkin/chooseCheckinFollowArea/ChooseCheckinFollowArea";
import IntroHotel from "../client/pages/hotel/IntroHotel/IntroHotel";
import Hotel from "../client/pages/hotel/hotel";
import IntroVehicle from "../client/pages/Vehicle/IntroVehicle/IntroVehicle"
import VehiclePage from "../client/pages/Vehicle/VehiclePage/VehiclePage";
import VehicleBooking from "../client/pages/Vehicle/VehicleBooking/VehicleBooking";

import { Component } from "react";
import DetailCard from "../client/pages/hotel/detailHotel/detailCard";
import Failed from "../client/pages/Payment/Status/Failed";
import TourPage from "../client/pages/Tour/TourPage";
import TourDetail from "../client/pages/Tour/TourDetail/TourDetail";
import TourIndex from "../client/pages/Tour/TourIndex";


import Account from "../enterprise/transportation/account/Account";
import Schedules from "../enterprise/transportation/schedules/Schedules";
import TransportationVouchers from "../enterprise/voucher/transportation/TransportationVouchers";
import schedules from "../enterprise/transportation/schedules/Schedules";
import Seats from "../enterprise/transportation/seats/Seats";
import Guest from "../enterprise/transportation/guest/Guest";
import Routehotel from "../enterprise/transportation/routehotel/Routehotel";
import TourForm from "../admin/pages/Tour/Tour";


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
        path: "/hotel",
        Component: IntroHotel,
      },
      {
        path: "/hotel-page",
        Component: Hotel,

      },
      {
        path: "/hotel-page/detail",
        Component: DetailCard,

      },
      {
        path: "/vehicle-intro",
        Component: IntroVehicle,
      },
      {
        path: "/vehicle-page",
        Component: VehiclePage,
      },
      {
        path: "/vehicle-booking",
        Component: VehicleBooking,
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
        path: "/submit-enterprise",
        Component: Sumbitenterprise,
      },
      {
        path: "/check-in",
        Component: Checkinpage,
      },
      {
        path: "/check-in/mien-bac",
        Component: ChooseProvinceDetail,
      },
      {
        path: "/check-in/mien-bac/hung-yen",
        Component: ChooseCheckinFollowArea,
      },
        path: "/tour",
        Component: TourIndex,
        children : [
          {
            path : "",
            Component : TourPage
          },
          {
           path : "detail/:tourId",
           Component: TourDetail
          }
         ]
      }
    ],
  },
];

export const router = createBrowserRouter([
  {
    Component: App,
    children: [...routeAdmin(), ...routeClient(), ...routeEnterprise()],
  },
]);
