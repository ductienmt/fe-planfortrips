import "./App.css";
import { SnackbarProvider } from "notistack";
import DashboardLayoutBasic from "./admin/dashboard/DashboardLayoutBasic";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <DashboardLayoutBasic />
      {/* <Outlet></Outlet> */}
    </SnackbarProvider>
  );
}

export default App;
