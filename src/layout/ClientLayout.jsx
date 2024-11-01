import { Outlet } from "react-router-dom";
import Header from "../client/pages/Header/Header";
import Footer from "../client/pages/Footer/Footer";

export const ClientLayout = () => {
  // Danh sách các path mà không cần hiện Header hoặc Footer
  const noHeaderFooterPaths = [""];
  const noFooterPaths = ["/plan", "/plan/trip", "/login", "/register"];

  const shouldShowHeader = !noHeaderFooterPaths.includes(location.pathname);
  const shouldShowFooter =
    !noHeaderFooterPaths.includes(location.pathname) &&
    !noFooterPaths.includes(location.pathname);
  return (
    <>
      {shouldShowHeader && <Header />}
      <Outlet />
      {shouldShowFooter && <Footer />}
    </>
  );
};
