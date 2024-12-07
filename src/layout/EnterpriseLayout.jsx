import { Outlet, useLocation, Navigate } from "react-router-dom";
import EnterpriseSidebar from "../enterprise/sidebar/EnterpriseSidebar";
import EnterpriseTopbar from "../enterprise/topbar/EnterpriseTopbar";
import { EnterpriseProvider } from "../context/EnterpriseContext/EnterpriseProvider";
import { useAuth } from "../context/AuthContext/AuthProvider";

export const EnterpriseLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/enterprise/login";

  return (
    <div
      className="enterprise-layout"
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      {!isLoginPage && <EnterpriseSidebar />}
      <div
        className="enterprise-main-content"
        style={{
          flexGrow: 1,
          flexBasis: "30%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!isLoginPage && <EnterpriseTopbar />}
        <div
          className="content"
          style={{
            display: "flex",
            flexBasis: isLoginPage ? "auto" : "70%",
            flexGrow: 2,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
