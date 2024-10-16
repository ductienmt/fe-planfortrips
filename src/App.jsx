import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TravelPlan from "./pages/Plan/TravelPlan";
import { SnackbarProvider } from "notistack";

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
        {/* Bọc các route bằng SnackbarProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/plan" element={<TravelPlan />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
