import { Outlet, useLocation } from "react-router-dom";
import Header from "../client/pages/Header/Header";
import Footer from "../client/pages/Footer/Footer";

export const ClientLayout = () => {
  const location = useLocation();

  // Danh sách các đường dẫn cần ẩn Header hoặc Footer
  const noHeaderFooterPaths = /^\/(profile|success|failed)/; // Regex để kiểm tra
  const noFooterPaths = new Set([
    "/plan",
    "/plan/trip",
    "/login",
    "/register",
    "/vehicle",
    "/booking/plan",
    "/booking/hotel",
    "/booking/transportation",
    "/hotel",
    "/check-in",
    "/payment",
    "/success",
  ]);

  // Kiểm tra logic hiển thị
  const shouldShowHeader = !noHeaderFooterPaths.test(location.pathname);
  const shouldShowFooter =
    shouldShowHeader && !noFooterPaths.has(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Outlet />
      {shouldShowFooter && <Footer />}
    </>
  );
};
