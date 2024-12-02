import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashboard.css";
import {
  faHouse,
  faUser,
  faBriefcase,
  faTicket,
  faChartPie,
  faMoneyBillWave,
  faDatabase,
  faUmbrellaBeach,
  faGear,
  faScrewdriverWrench,
  faHotel,
  faCableCar,
  faEarthAsia,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AdminService } from "../../../services/apis/AdminService";
import { parseJwt } from "../../../utils/Jwt";
import { useAuth } from "../../../context/AuthContext/AuthProvider";
import logo from "../../../assets/planfortrips-logo_1.png";
import { router } from "../../../routes/route";
const NAVIGATION = [
  {
    kind: "header",
    title: "Menu",
  },
  {
    title: (
      <NavLink to="" className="nav-linkAdmin">
        Trang chủ
      </NavLink>
    ),
    icon: (
      <NavLink to="" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faHouse} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="users" className="nav-linkAdmin">
        Người dùng
      </NavLink>
    ),
    icon: (
      <NavLink to="users" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    ),
    segment: 'users',
  },
  {
    title: (
      <NavLink to="business" className="nav-linkAdmin">
        Doanh nghiệp
      </NavLink>
    ),
    icon: (
      <NavLink to="business" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faBriefcase} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="tours" className="nav-linkAdmin">
        Tour
      </NavLink>
    ),
    icon: (
      <NavLink to="tours" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faEarthAsia} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="vouchers" className="nav-linkAdmin">
        Mã giảm giá
      </NavLink>
    ),
    icon: (
      <NavLink to="vouchers" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faTicket} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="statistics" className="nav-linkAdmin">
        Thống kê
      </NavLink>
    ),
    icon: (
      <NavLink to="statistics" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faChartPie} />
      </NavLink>
    ),
  },
  {
    title: "Giao dịch",
    icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
    children: [
      {
        title: (
          <NavLink to="transactions/hotels" className="nav-linkAdmin">
            Đơn đặt phòng
          </NavLink>
        ),
        icon: (
          <NavLink to="transactions/hotels" className="nav-linkAdmin">
            <FontAwesomeIcon icon={faHotel} />
          </NavLink>
        ),
      },
      {
        title: (
          <NavLink to="transactions/vehicles" className="nav-linkAdmin">
            Đơn đặt xe
          </NavLink>
        ),
        icon: (
          <NavLink to="transactions/vehicles" className="nav-linkAdmin">
            <FontAwesomeIcon icon={faCableCar} />
          </NavLink>
        ),
      },
    ],
  },
  {
    title: (
      <NavLink to="feedbacks" className="nav-linkAdmin">
        Đánh giá
      </NavLink>
    ),
    icon: (
      <NavLink to="feedbacks" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faDatabase} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="travel" className="nav-linkAdmin">
        Điểm du lịch
      </NavLink>
    ),
    icon: (
      <NavLink to="travel" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faUmbrellaBeach} />
      </NavLink>
    ),
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Cài đặt",
  },
  {
    title: (
      <NavLink to="settings" className="nav-linkAdmin">
        Cài đặt
      </NavLink>
    ),
    icon: (
      <NavLink to="settings" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faGear} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="tools" className="nav-linkAdmin">
        Công cụ
      </NavLink>
    ),
    icon: (
      <NavLink to="tools" className="nav-linkAdmin">
        <FontAwesomeIcon icon={faScrewdriverWrench} />
      </NavLink>
    ),
  },
];
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBasic({ window }) {
  const [admin, setAdmin] = React.useState({});
  const { login, logout } = useAuth();
  const token = sessionStorage.getItem("token");
  const userName = token ? parseJwt(token).sub : "";
  React.useEffect(() => {
    const fetch = async () => {
      const data = await AdminService.findAdminUsername(userName);
      if (data) {
        setAdmin(data);
      }
    };
    fetch();
  }, []);
  const navigate = useNavigate();
  const [session, setSession] = React.useState({
    user: {
      name: "",
      email: "",
      image:
        "https://i.pinimg.com/736x/0a/ab/67/0aab67dce992f37b5a22f681f043574f.jpg",
    },
  });
  const demoWindow = window !== undefined ? window() : undefined;
  React.useEffect(() => {
    if (admin.fullName || admin.email) {
      setSession({
        user: {
          name: admin.fullName || "",
          email: admin.email || "",
          image:
            "https://i.pinimg.com/736x/0a/ab/67/0aab67dce992f37b5a22f681f043574f.jpg",
        },
      });
    }
  }, [admin]);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: admin.fullName ?? "",
            email: admin.email ?? "",
            image:
              "https://i.pinimg.com/736x/0a/ab/67/0aab67dce992f37b5a22f681f043574f.jpg",
          },
        });
      },
      signOut: () => {
        logout();
        navigate("/admin/login");
      },
    };
  }, [navigate]);
  React.useEffect(() => {
    const listItemButtons = document.querySelectorAll(
      "a.MuiButtonBase-root.MuiListItemButton-root"
    );
    listItemButtons.forEach((item) => {
      item.style.backgroundColor = "transparent"; // Loại bỏ background
    });
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      session={session}
      authentication={authentication}
      theme={demoTheme}
      window={demoWindow}
      router={router}
      branding={{
        logo: <img src={logo} alt="Plan For Trips logo" />,
        title: "",
      }}
    >
      <Outlet />
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
