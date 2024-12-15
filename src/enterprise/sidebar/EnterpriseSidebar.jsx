import React, { useEffect, useState, useMemo } from "react";
import "./EnterpriseSidebar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/planfortrips-logo_1.png";
import { useEnterprise } from "../../context/EnterpriseContext/EnterpriseProvider";
import { useAuth } from "../../context/AuthContext/AuthProvider";
import Account from "../transportation/account/Account";

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

  const handleSelect = (item, path) => {
    setSelectedItem(item);
    sessionStorage.setItem("selectedItem", item);

    if (item === "aco-account" || item === "vehicle-account") {
      const accountElement = document.getElementById("accountModal");
      if (accountElement) {
        accountElement.click();
      }
      return;
    }

    navigate(`/enterprise/${path}`);
  };

  useEffect(() => {
    const itemFromURL = location.pathname.split("/").pop();
    if (itemFromURL !== selectedItem) {
      setSelectedItem(itemFromURL);
      sessionStorage.setItem("selectedItem", itemFromURL);
    }
  }, [location.pathname]);

  const menuItems = useMemo(() => {
    const commonItems = [
      {
        key: "dashboard",
        icon: "fa-house",
        label: "Thống kê",
        path: `${typeEnterprise === "Xe khách" ? "transportation" : "accomodation"}/dashboard`,
      },
      // {
      //   key: "voucher-manager",
      //   icon: "fa-ticket",
      //   label: "Mã giảm giá",
      //   path: `${typeEnterprise === "Xe khách" ? "transportation" : "accomodation"}/voucher-manager`,
      // },
    ];

    const accomodationItems = [
      {
        key: "accomodation-manager",
        icon: "fa-hotel",
        label: `Quản lý ${typeEnterprise}`,
        path: "accomodation/accomodation-manager",
      },
      {
        key: "guest-manager",
        icon: "fa-user-check",
        label: "Khách hàng",
        path: "accomodation/guest-manager",
      },
      ...(typeEnterprise !== "Homestay"
        ? [
            {
              key: ["choose-hotel", "room-management"],
              icon: "fa-bed",
              label: "Quản lý phòng",
              path: "accomodation/choose-hotel",
            },
          ]
        : []),
      {
        key: "voucher-manager",
        icon: "fa-ticket",
        label: "Quản lý voucher",
        path: "accomodation/voucher-manager",
      },
      {
        key: "aco-account",
        icon: "fa-solid fa-user",
        label: "Account",
        path: "",
        onClick: () => {
          document.getElementById("acco").click();
        },
      },
    ];

    const transportationItems = [
      {
        key: "Guest",
        icon: "fa-clipboard-list",
        label: "Khách hàng",
        path: "transportation/Guest",
      },
      {
        key: "vehicle-management",
        icon: "fa-car",
        label: "Quản lý xe",
        path: "transportation/vehicle-management",
      },
      {
        key: "Seats",
        icon: "fa-solid fa-couch",
        label: "Quản lý ghế",
        path: "transportation/Seats",
      },
      {
        key: "Routehotel",
        icon: "fa-route",
        label: "Tuyến",
        path: "transportation/Routehotel",
      },
      {
        key: "vehicle-schedules",
        icon: "fa-solid fa-calendar-days",
        label: "Lịch trình",
        path: "transportation/vehicle-schedules",
      },
      {
        key: "vouchers",
        icon: "fa-ticket",
        label: "Khuyến mãi",
        path: "transportation/vouchers",
      },
      {
        key: "vehicle-account",
        icon: "fa-solid fa-user",
        label: "Tài khoản",
        path: "",
        onClick: () => {
          document.getElementById("acco").click();
        },
      },
    ];

    return typeEnterprise === "Xe khách"
      ? [...commonItems, ...transportationItems]
      : [...commonItems, ...accomodationItems];
  }, [typeEnterprise]);

  return (
    <>
      <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
        <div className="top">
          <div className="sidebar-header">
            <img
              src={logo}
              alt="Logo"
              className="logo"
              style={{ width: "80%", cursor: "pointer" }}
              onClick={toggleSidebar}
            />
          </div>
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={
                  Array.isArray(item.key)
                    ? item.key.includes(selectedItem)
                      ? "isActive"
                      : ""
                    : selectedItem === item.key
                      ? "isActive"
                      : ""
                }
                onClick={() =>
                  handleSelect(
                    Array.isArray(item.key) ? item.key[0] : item.key,
                    item.path
                  )
                }
              >
                <Link to={item.path ? `/enterprise/${item.path}` : "#"}>
                  <i className={`fa-solid ${item.icon}`}></i>{" "}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
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
        <button
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target="#accountModalEnterprise"
          id="accountModal"
        ></button>
      </div>
      <Account />
    </>
  );
};

export default React.memo(EnterpriseSidebar);
