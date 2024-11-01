import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../client/pages/Homepage/LandingPage";
import LoginAdmin from "../admin/pages/Auth/Login";
import Exchange from "../admin/pages/Exchange/Exchange";
import UserAdmin from "../admin/pages/User/User";
import EnterpriseAdmin from "../admin/pages/Enterprise/Enterprise";
import CouponAdmin from "../admin/pages/Coupon/Coupon";
import TravelAdmin from "../admin/pages/Travel/Travel";
import LayoutAdmin from "../admin/pages/Layout/Layout";
import HomePage from "../admin/pages/Dashboard/HomePage";
import Hotel from "../client/pages/HotelPage/Hotel/Hotel";

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
    Component: LandingPage,
    children: [
      {
        path: "hotels",
        Component: Hotel,
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      ...routeAdmin(),  
      ...routeClient(),
    ],
  },
]);
