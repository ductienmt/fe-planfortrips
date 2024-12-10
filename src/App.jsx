import "./App.css";
import { SnackbarProvider } from "notistack";
import DashboardLayoutBasic from "./admin/pages/Layout/DashboardLayoutBasic";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext/AuthProvider";
import ChatbotComponent from "./client/Components/ChatBotAI/ChatBox";
import MessengerChat from "./client/Components/ChatBotAI/ChatMessenger";
// import LoginAdmin from "./admin/pages/Auth/Login/Login";
const checkRoleAdmin = () => {
  const { token } = useAuth();
  const { role } = useAuth();
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
      {checkRoleAdmin("ROLE_ADMIN") ? (
        <DashboardLayoutBasic />
      ) : (
        <>
          <Outlet /> <ChatbotComponent /> <MessengerChat/>
        </>
      )}
    </SnackbarProvider>
  );
}

export default App;
