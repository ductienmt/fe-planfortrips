import { Outlet, useLocation } from "react-router-dom";
import EnterpriseSidebar from "../enterprise/sidebar/EnterpriseSidebar";
import EnterpriseTopbar from "../enterprise/topbar/EnterpriseTopbar";
import { EnterpriseProvider } from "../context/EnterpriseContext/EnterpriseProvider";

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

export const ProtectedRouteEnterprise = ({ allowedRoles }) => {
  const { token, role } = useAuth();
  const location = useLocation();

  if (!token) {
    return (
      <Navigate to="/enterprise/login" state={{ from: location }} replace />
    );
  }

  if (
    allowedRoles &&
    !Array.isArray(allowedRoles) &&
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
