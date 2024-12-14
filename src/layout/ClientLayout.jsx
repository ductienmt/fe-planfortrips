import { Outlet, useLocation } from "react-router-dom";
import Header from "../client/pages/Header/Header";
import Footer from "../client/pages/Footer/Footer";

export const ClientLayout = () => {
  const location = useLocation();

  // Regex để kiểm tra các đường dẫn không hiển thị Footer
  const noFooterRegex =
    /^\/(check-in|plan|login|register|vehicle|booking\/plan|booking\/hotel|booking\/transportation|hotel|payment|success|failed|tour|forgot-password)(\/.*)?$/;

  // Regex để kiểm tra các đường dẫn không hiển thị cả Header và Footer
  const noHeaderFooterRegex = /^\/(profile|success|failed)/;

  // Kiểm tra logic hiển thị
  const shouldShowHeader = !noHeaderFooterRegex.test(location.pathname);
  const shouldShowFooter =
    shouldShowHeader && !noFooterRegex.test(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Outlet />
      {shouldShowFooter && <Footer />}
    </>
  );
};
