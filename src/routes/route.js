import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../admin/dashboard/Layout";
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
import { EnterpriseLayout } from "../layout/EnterpriseLayout";
import Profile from "../client/pages/Profile/Profile";
// import EnterpriseLogin from "../enterprise/auth/login/EnterpriseLogin"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/admin",
        Component: Layout,
        children: [
          {
            path: "",
            Component: LandingPage,
          },
          {
            path: "about",
            Component: Login,
          },
        ],
      },
      {
        path: "",
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
        ],
      },
      // {
      //   path: "/enterprise",
      //   Component: EnterpriseLayout,
      //   children: [
      //     {
      //       path: "",
      //       Component: EnterpriseLogin,
      //     },
      //   ],
      // },
    ],
  },
]);
