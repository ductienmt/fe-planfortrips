import "./App.css";
import { SnackbarProvider } from "notistack";
import DashboardLayoutBasic from "./admin/pages/Layout/DashboardLayoutBasic";
import { Outlet } from "react-router-dom";
// import LoginAdmin from "./admin/pages/Auth/Login/Login";
const checkRoleAdmin = () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  if (!token || role !== "ROLE_ADMIN") {
    return false;
  }
  return true;
};
function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {checkRoleAdmin("ROLE_ADMIN") ? <DashboardLayoutBasic /> : <Outlet />}
    </SnackbarProvider>
  );
}

export default App;
