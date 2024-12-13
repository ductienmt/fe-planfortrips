import "./App.css";
import { SnackbarProvider } from "notistack";
import DashboardLayoutBasic from "./admin/pages/Layout/DashboardLayoutBasic";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext/AuthProvider";
import ChatbotComponent from "./client/Components/ChatBotAI/ChatBox";
import MessengerCustomerChat from "react-messenger-customer-chat";
import zIndex from "@mui/material/styles/zIndex";

function App() {
  const { token, role } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdmin = token && role === "ROLE_ADMIN";

  const shouldRenderChat = 
    !isAdmin && 
    !isAdminRoute && 
    !["/admin", "/enterprise"].includes(location.pathname);

  return (
    <SnackbarProvider>
      {isAdmin ? (
        <DashboardLayoutBasic />
      ) : (
        <>
          <Outlet />
          {shouldRenderChat && (
            <>
              <ChatbotComponent />
              <MessengerCustomerChat
                pageId="370677252791790"
                appId="8815174515227657"
              />
            </>
          )}
        </>
      )}
    </SnackbarProvider>
  );
}

export default App;