import "./App.css";
import { SnackbarProvider } from "notistack";
import DashboardLayoutBasic from "./admin/pages/Layout/DashboardLayoutBasic";
import LoginAdmin from "./admin/pages/Auth/Login/Login";
const checkAuth =(requiredRole)=>{
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  if(!token || role !== requiredRole ){
    return false;
  }
  return true
}
function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {checkAuth('ROLE_ADMIN') ? <DashboardLayoutBasic /> : <LoginAdmin/>}
    </SnackbarProvider>
  );
}

export default App;
