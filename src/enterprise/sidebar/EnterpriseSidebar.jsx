import React, { useState } from "react";
import "./EnterpriseSidebar.css";
import { Link } from "react-router-dom";
import {
  Dashboard,
  Report,
  Settings,
  Logout,
  BusinessCenter,
} from "@mui/icons-material";

const EnterpriseSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="top">
          <div className="sidebar-header">
            <img src="/path/to/logo.png" alt="Logo" className="logo" />
            {/* <button onClick={toggleSidebar}>
              {collapsed ? "Expand" : "Collapse"}
            </button> */}
          </div>
          <ul className="sidebar-menu">
            <li>
              <Link to="/enterprise/dashboard">
                <Dashboard /> {!collapsed && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="reports">
                <Report /> {!collapsed && "Reports"}
              </Link>
            </li>
            <li>
              <Link to="settings">
                <Settings /> {!collapsed && "Settings"}
              </Link>
            </li>
            <li>
              <Link to="business">
                <BusinessCenter /> {!collapsed && "Business"}
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div className="sidebar-footer">
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Logout /> {!collapsed && "Logout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterpriseSidebar;
