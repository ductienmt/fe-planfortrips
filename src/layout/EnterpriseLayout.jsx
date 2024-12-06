import { Outlet, useLocation, useNavigate } from "react-router-dom";
import EnterpriseSidebar from "../enterprise/sidebar/EnterpriseSidebar";
import EnterpriseTopbar from "../enterprise/topbar/EnterpriseTopbar";
import { EnterpriseProvider } from "../context/EnterpriseContext/EnterpriseProvider";
import { useAuth } from "../context/AuthContext/AuthProvider";
import { useEffect } from "react";

export const EnterpriseLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/enterprise/login";
  const { username, role } = useAuth();

  useEffect(() => {
    if (!isLoginPage && (!username || role !== "ROLE_ENTERPRISE")) {
      navigate("/enterprise/login");
    }
  }, [isLoginPage, username, role, navigate]);

  return (
    <>
      <EnterpriseProvider>
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
            {!isLoginPage && (
              <div
                className="content"
                style={{
                  display: "flex",
                  flexBasis: "70%",

                  flexGrow: 2,
                  overflowY: "auto",
                }}
              >
                <Outlet />
              </div>
            )}
            {isLoginPage && (
              <div className="login-content">
                <Outlet />
              </div>
            )}
          </div>
        </div>
      </EnterpriseProvider>
    </>
  );
};
