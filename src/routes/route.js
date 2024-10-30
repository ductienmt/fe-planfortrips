import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginAdmin from "../admin/pages/Auth/Login";
import Exchange from "../admin/pages/Exchange/Exchange";
import UserAdmin from "../admin/pages/User/User";
import EnterpriseAdmin from "../admin/pages/Enterprise/Enterprise";
import CouponAdmin from "../admin/pages/Coupon/Coupon";
import TravelAdmin from "../admin/pages/Travel/Travel";
import LayoutAdmin from "../admin/pages/Layout/Layout";
import HomePage from "../admin/pages/Dashboard/HomePage";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: LayoutAdmin,
        children: [
          {
            path: "/",
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
        path: "/admin/auth",
        Component: LoginAdmin,
      },
    ],
  },
]);
