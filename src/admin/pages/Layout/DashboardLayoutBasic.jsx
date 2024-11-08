import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { router } from "../../../routes/route";
import { Switch } from "@mui/material";
import handleToken from "../../../services/HandleToken";
import { AdminService } from "../../../services/apis/AdminService";
import { parseJwt } from "../../../utils/Jwt";
const NAVIGATION = [
  {
    kind: "header",
    title: "Menu",
  },
  {
    title: (
      <NavLink to="" style={{ textDecoration: "none" }} >
        Trang chủ
      </NavLink>
    ),
    icon: (
      <NavLink to="">
        <FontAwesomeIcon icon={faHouse} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="users" style={{ textDecoration: "none" }}>
        Người dùng
      </NavLink>
    ),
    icon: (
      <NavLink to="users" style={{ textDecoration: "none" }}>
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="business" style={{ textDecoration: "none" }}>
        Doanh nghiệp
      </NavLink>
    ),
    icon: (
      <NavLink to="business" style={{ textDecoration: "none" }}>
        <FontAwesomeIcon icon={faBriefcase} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="vouchers" style={{ textDecoration: "none" }}>
        Mã giảm giá
      </NavLink>
    ),
    icon: (
      <NavLink to="vouchers" style={{ textDecoration: "none" }}>
        <FontAwesomeIcon icon={faTicket} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="statistics" style={{ textDecoration: "none" }}>
        Thống kê
      </NavLink>
    ),
    icon: (
      <NavLink to="statistics" style={{ textDecoration: "none" }}>
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
          <NavLink to="transactions/hotels" style={{ textDecoration: "none" }}>
            Đơn đặt phòng
          </NavLink>
        ),
        icon: (
          <NavLink to="transactions/hotels" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faHotel} />
          </NavLink>
        ),
      },
      {
        title: (
          <NavLink
            to="transactions/vehicles"
            style={{ textDecoration: "none" }}
          >
            Đơn đặt xe
          </NavLink>
        ),
        icon: (
          <NavLink
            to="transactions/vehicles"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faCableCar} />
          </NavLink>
        ),
      },
    ],
  },
  {
    title: (
      <NavLink to="feedbacks" style={{ textDecoration: "none" }}>
        Đánh giá
      </NavLink>
    ),
    icon: (
      <NavLink to="resources" style={{ textDecoration: "none" }}>
        <FontAwesomeIcon icon={faDatabase} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="travel" style={{ textDecoration: "none" }}>
        Điểm du lịch
      </NavLink>
    ),
    icon: (
      <NavLink to="travel" style={{ textDecoration: "none" }}>
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
      <NavLink to="settings" style={{ textDecoration: "none" }}>
        Cài đặt
      </NavLink>
    ),
    icon: (
      <NavLink to="settings" style={{ textDecoration: "none" }}>
        <FontAwesomeIcon icon={faGear} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="tools" style={{ textDecoration: "none" }}>
        Công cụ
      </NavLink>
    ),
    icon: (
      <NavLink to="tools" style={{ textDecoration: "none" }}>
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
  const token = localStorage.getItem("accessToken");
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
          image: "https://i.pinimg.com/736x/0a/ab/67/0aab67dce992f37b5a22f681f043574f.jpg",
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
        handleToken.delete();
        navigate("/admin/login");
      },
    };
  }, [navigate]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      session={session}
      authentication={authentication}
      theme={demoTheme}
      window={demoWindow}
      router={router.basename}
      branding={{
        logo: <img src="src/assets/momo.png" alt="Plan For Trips logo" />,
        title: "Plan for trips",
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
