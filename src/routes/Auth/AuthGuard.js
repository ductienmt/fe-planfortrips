import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, requiredRole }) => {
  const token = sessionStorage.getItem("token"); 
  const role = sessionStorage.getItem("role");
  if (!token || role !== requiredRole) {
    return <Navigate to={`/${requiredRole}/login`} replace />;
  }
  return children;
};

export default AuthGuard;
