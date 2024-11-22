import { createContext, useState, useContext, useEffect } from "react";
import AuthService from "./AuthServiceContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [role, setRole] = useState(sessionStorage.getItem("role") || null);
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || null
  );

  useEffect(() => {
    const expirationTime = sessionStorage.getItem("expirationTime");
    if (expirationTime) {
      const timeLeft = new Date(expirationTime) - new Date();
      if (timeLeft > 0) {
        setTimeout(logout, timeLeft);
      } else {
        logout();
      }
    }
  }, []);

  const login = (newToken, newRole, newUsername) => {
    const expirationTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    AuthService.setToken(newToken);
    AuthService.setRole(newRole);
    AuthService.setUsername(newUsername);

    setToken(newToken);
    setRole(newRole);
    setUsername(newUsername);
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("role", newRole);
    sessionStorage.setItem("username", newUsername);
    sessionStorage.setItem("expirationTime", expirationTime);

    setTimeout(logout, 24 * 60 * 60 * 1000);
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
    sessionStorage.removeItem("expirationTime");
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

export const useAuth = () => {
  return useContext(AuthContext);
};
