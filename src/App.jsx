import "./App.css";
import { SnackbarProvider } from "notistack";
import DashboardLayoutBasic from "./admin/dashboard/DashboardLayoutBasic";

function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <DashboardLayoutBasic />
      </SnackbarProvider>
    </>
  );
}

export default App;
