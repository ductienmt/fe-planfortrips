import { createContext, useState, useContext } from "react";
import AuthService from "./AuthServiceContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [role, setRole] = useState(sessionStorage.getItem("role") || null);
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || null
  );

  const login = (newToken, newRole, newUsername) => {
    AuthService.setToken(newToken);
    AuthService.setRole(newRole);
    AuthService.setUsername(newUsername);

    setToken(newToken);
    setRole(newRole);
    setUsername(newUsername);
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("role", newRole);
    sessionStorage.setItem("username", newUsername);
  };

  const logout = () => {
    AuthService.clearToken();
    AuthService.clearRole();
    AuthService.clearUsername();

    setToken(null);
    setRole(null);
    setUsername(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
  };

  const authContextValue = {
    token,
    role,
    username,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để truy cập AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
