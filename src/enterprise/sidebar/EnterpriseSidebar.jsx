import React, { useEffect, useState } from "react";
import "./EnterpriseSidebar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/planfortrips-logo_1.png";
import { useEnterprise } from "../../context/EnterpriseContext/EnterpriseProvider";
import { useAuth } from "../../context/AuthContext/AuthProvider";

const EnterpriseSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { typeEnterprise } = useEnterprise();
  const initialSelectedItem =
    sessionStorage.getItem("selectedItem") || "dashboard";
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    sessionStorage.setItem("selectedItem", item);
  };

  useEffect(() => {
    // Xác định base path theo loại doanh nghiệp
    const basePath =
      typeEnterprise === "Xe khách" ? "transportation" : "accomodation";

    // Xác định selectedItem từ URL hiện tại nếu người dùng nhập trực tiếp
    const itemFromURL = location.pathname.split("/").pop();

    // Nếu selectedItem khác với URL hiện tại, cập nhật nó và lưu vào sessionStorage
    if (itemFromURL !== selectedItem) {
      setSelectedItem(itemFromURL);
      sessionStorage.setItem("selectedItem", itemFromURL);
    }
  }, [typeEnterprise, location.pathname]);

  return (
    <>
      <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
        <div className="top">
          <div className="sidebar-header">
            <img
              src={logo}
              alt="Logo"
              className="logo"
              style={{
                width: "80%",
                cursor: "pointer",
              }}
              onClick={toggleSidebar}
            />
          </div>
          <ul className="sidebar-menu">
            {["Homestay", "Resort", "Khách sạn"].includes(typeEnterprise) && (
              <>
                <li
                  className={selectedItem === "dashboard" ? "isActive" : ""}
                  onClick={() => handleSelect("dashboard")}
                >
                  <Link to="/enterprise/accomodation/dashboard">
                    <i className="fa-duotone fa-solid fa-house"></i>{" "}
                    {!collapsed && <span>Thống kê</span>}
                  </Link>
                </li>
                <li
                  className={
                    selectedItem === "accomodation-manager" ? "isActive" : ""
                  }
                  onClick={() => handleSelect("accomodation-manager")}
                >
                  <Link to="/enterprise/accomodation/accomodation-manager">
                    <i className="fa-solid fa-hotel"></i>{" "}
                    {!collapsed && (
                      <span>
                        Quản lý{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {typeEnterprise}
                        </span>
                      </span>
                    )}
                  </Link>
                </li>
                {typeEnterprise !== "Homestay" && (
                  <>
                    <li
                      className={
                        selectedItem === "room-management" ? "isActive" : ""
                      }
                      onClick={() => handleSelect("room-management")}
                    >
                      <Link to="accomodation/room-management">
                        <i className="fa-duotone fa-solid fa-bed"></i>{" "}
                        {!collapsed && <span>Quản lý phòng</span>}
                      </Link>
                    </li>
                    <li
                      className={
                        selectedItem === "room-history" ? "isActive" : ""
                      }
                      onClick={() => handleSelect("room-history")}
                    >
                      <Link to="accomodation/room-history">
                        <i className="fa-duotone fa-solid fa-timeline"></i>{" "}
                        {!collapsed && <span>Lịch sử sử dụng phòng</span>}
                      </Link>
                    </li>
                  </>
                )}
                <li
                  className={selectedItem === "vouchers" ? "isActive" : ""}
                  onClick={() => handleSelect("vouchers")}
                >
                  <Link to="accomodation/vouchers">
                    <i className="fa-solid fa-ticket"></i>{" "}
                    {!collapsed && <span>Mã giảm giá</span>}
                  </Link>
                </li>
              </>
            )}

            {typeEnterprise === "Xe khách" && (
              <>
                <li
                  className={selectedItem === "dashboard" ? "isActive" : ""}
                  onClick={() => handleSelect("dashboard")}
                >
                  <Link to="/enterprise/transportation/dashboard">
                    <i className="fa-duotone fa-solid fa-house"></i>{" "}
                    {!collapsed && <span>Thống kê</span>}
                  </Link>
                </li>
                <li
                  className={selectedItem === "schedule" ? "isActive" : ""}
                  onClick={() => handleSelect("schedule")}
                >
                  <Link to="transportation/schedule">
                    <i className="fa-solid fa-clipboard-list"></i>
                    {!collapsed && <span>Lịch trình</span>}
                  </Link>
                </li>
                <li
                  className={
                    selectedItem === "vehicle-management" ? "isActive" : ""
                  }
                  onClick={() => handleSelect("vehicle-management")}
                >
                  <Link to="transportation/vehicle-management">
                    <i className="fa-solid fa-car"></i>{" "}
                    {!collapsed && <span>Quản lý xe</span>}
                  </Link>
                </li>
                <li
                  className={selectedItem === "routes" ? "isActive" : ""}
                  onClick={() => handleSelect("routes")}
                >
                  <Link to="transportation/routes">
                    <i className="fa-solid fa-route"></i>{" "}
                    {!collapsed && <span>Tuyến</span>}
                  </Link>
                </li>
                <li
                  className={selectedItem === "vouchers" ? "isActive" : ""}
                  onClick={() => handleSelect("vouchers")}
                >
                  <Link to="transportation/vouchers">
                    <i className="fa-solid fa-ticket"></i>{" "}
                    {!collapsed && <span>Mã giảm giá</span>}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="bottom">
          <div className="sidebar-footer">
            <button
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={() => {
                logout();
                navigate("/enterprise/login");
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>{" "}
              {!collapsed && "Logout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterpriseSidebar;
