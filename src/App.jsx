import "./App.css";
import { SnackbarProvider } from "notistack";
import DashboardLayoutBasic from "./admin/pages/Layout/DashboardLayoutBasic";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext/AuthProvider";

function App() {
  const location = useLocation();
  const { token, role } = useAuth();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const checkRoleAdmin = () => {
    return token && role === "ROLE_ADMIN";
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {isAdminRoute ? (
        checkRoleAdmin() ? (
          <DashboardLayoutBasic />
        ) : (
          <div>Access Denied</div>
        )
      ) : (
        <Outlet />
      )}
    </SnackbarProvider>
  );
}

export default App;
