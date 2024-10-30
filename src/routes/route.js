import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../admin/dashboard/Layout";
import LandingPage from "../client/pages/Homepage/LandingPage";
import LoginAdmin from "../admin/Auth/Login";
import Exchange from "../admin/Exchange/Exchange";
import UserAdmin from "../admin/User/User";
import EnterpriseAdmin from "../admin/Enterprise/Enterprise";
import CouponAdmin from "../admin/Coupon/Coupon";
import TravelAdmin from "../admin/Travel/Travel";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "/",
            Component: LandingPage,
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
        path: "/admin/auth",
        Component: LoginAdmin,
      },
    ],
  },
]);
