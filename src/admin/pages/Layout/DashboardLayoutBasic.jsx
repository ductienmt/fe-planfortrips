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
import { NavLink, Outlet } from "react-router-dom";
import { router } from "../../../routes/route";
import { Switch } from "@mui/material";
const NAVIGATION = [
  {
    kind: "header",
    title: "Menu",
  },
  {
    title: (
      <NavLink to="" style={{ textDecoration: "none" }}>
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
    title: (
        'Giao dịch'
    ),
    icon: (
        <FontAwesomeIcon icon={faMoneyBillWave} />
    ),
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
          <NavLink to="transactions/vehicles" style={{ textDecoration: "none" }}>
            Đơn đặt xe
          </NavLink>
        ),
        icon: (
          <NavLink to="transactions/vehicles" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faCableCar} />
          </NavLink>
        ),
      },
    ],
  },
  {
    title: (
      <NavLink to="resources" style={{ textDecoration: "none" }}>
        Tài nguyên
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
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));
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
  const [session, setSession] = React.useState({
    user: {
      name: "Cô giáo thảo",
      email: "hentaivn@gmail.com",
      image:
        "https://images.kienthuc.net.vn/zoomh/800/uploaded/phuongdh/2024_10_24/4/gai-xinh-so-huu-vong-3-to-bat-thuong-cham-chi-khoe-dang.jpg",
    },
  });

  const demoWindow = window !== undefined ? window() : undefined;

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Cô giáo thảo",
            email: "hentaivn@gmail.com",
            image:
              "https://images.kienthuc.net.vn/zoomh/800/uploaded/phuongdh/2024_10_24/4/gai-xinh-so-huu-vong-3-to-bat-thuong-cham-chi-khoe-dang.jpg",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

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
