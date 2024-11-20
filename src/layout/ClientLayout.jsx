import { Outlet, useLocation } from "react-router-dom";
import Header from "../client/pages/Header/Header";
import Footer from "../client/pages/Footer/Footer";

export const ClientLayout = () => {
  const location = useLocation();

  // Danh sách các path mà không cần hiện Header hoặc Footer
  const noHeaderFooterPaths = /^\/(profile)/; // Các đường dẫn cần ẩn Header và Footer
  const noFooterPaths = [
    "/plan",
    "/plan/trip",
    "/login",
    "/register",
    "/vehicle",
    "/booking/plan",
    "/booking/hotel",
    "/booking/transportation",
    "/hotel",
    "/payment",
  ]; // Các đường dẫn chỉ ẩn Footer

  // Xác định hiển thị Header và Footer
  const shouldShowHeader = !noHeaderFooterPaths.test(location.pathname);
  const shouldShowFooter =
    shouldShowHeader && !noFooterPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Outlet />
      {shouldShowFooter && <Footer />}
    </>
  );
};
