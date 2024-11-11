import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
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
import { AdminService } from "../../../services/apis/AdminService";
import { parseJwt } from "../../../utils/Jwt";
const NAVIGATION = [
  {
    kind: "header",
    title: "Menu",
  },
  {
    title: (
      <NavLink to="" className="nav-link">
        Trang chủ
      </NavLink>
    ),
    icon: (
      <NavLink to="" className="nav-link">
        <FontAwesomeIcon icon={faHouse} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="users" className="nav-link">
        Người dùng
      </NavLink>
    ),
    icon: (
      <NavLink to="users" className="nav-link">
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="business" className="nav-link">
        Doanh nghiệp
      </NavLink>
    ),
    icon: (
      <NavLink to="business" className="nav-link">
        <FontAwesomeIcon icon={faBriefcase} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="vouchers" className="nav-link">
        Mã giảm giá
      </NavLink>
    ),
    icon: (
      <NavLink to="vouchers" className="nav-link">
        <FontAwesomeIcon icon={faTicket} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="statistics" className="nav-link">
        Thống kê
      </NavLink>
    ),
    icon: (
      <NavLink to="statistics" className="nav-link">
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
          <NavLink to="transactions/hotels" className="nav-link">
            Đơn đặt phòng
          </NavLink>
        ),
        icon: (
          <NavLink to="transactions/hotels" className="nav-link">
            <FontAwesomeIcon icon={faHotel} />
          </NavLink>
        ),
      },
      {
        title: (
          <NavLink to="transactions/vehicles" className="nav-link">
            Đơn đặt xe
          </NavLink>
        ),
        icon: (
          <NavLink to="transactions/vehicles" className="nav-link">
            <FontAwesomeIcon icon={faCableCar} />
          </NavLink>
        ),
      },
    ],
  },
  {
    title: (
      <NavLink to="feedbacks" className="nav-link">
        Đánh giá
      </NavLink>
    ),
    icon: (
      <NavLink to="feedbacks" className="nav-link">
        <FontAwesomeIcon icon={faDatabase} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="travel" className="nav-link">
        Điểm du lịch
      </NavLink>
    ),
    icon: (
      <NavLink to="travel" className="nav-link">
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
      <NavLink to="settings" className="nav-link">
        Cài đặt
      </NavLink>
    ),
    icon: (
      <NavLink to="settings" className="nav-link">
        <FontAwesomeIcon icon={faGear} />
      </NavLink>
    ),
  },
  {
    title: (
      <NavLink to="tools" className="nav-link">
        Công cụ
      </NavLink>
    ),
    icon: (
      <NavLink to="tools" className="nav-link">
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
