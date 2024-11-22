import { Outlet, useLocation } from "react-router-dom";
import EnterpriseSidebar from "../enterprise/sidebar/EnterpriseSidebar";
import EnterpriseTopbar from "../enterprise/topbar/EnterpriseTopbar";
import { EnterpriseProvider } from "../context/EnterpriseContext/EnterpriseProvider";

export const EnterpriseLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/enterprise/login";
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
