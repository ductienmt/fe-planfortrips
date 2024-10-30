import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../admin/dashboard/Layout";
import LandingPage from "../client/pages/Homepage/LandingPage";
import Login from "../client/pages/Auth/Login/Login";

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
              path: "/about",
              Component: Login,
            },
          ],
        },
      ],
    },
  ]);