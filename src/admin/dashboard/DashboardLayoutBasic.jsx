import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import PageContent from "./PageContent";  
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
} from "@fortawesome/free-solid-svg-icons";
const NAVIGATION = [
  {
    kind: "header",
    title: "Menu",
  },
  {
    segment: "dashboard",
    title: "Trang chủ",
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
  {
    segment: "users",
    title: "Người dùng",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    segment: "business",
    title: "Doanh nghiệp",
    icon: <FontAwesomeIcon icon={faBriefcase} />,
  },
  {
    segment: "vouchers",
    title: "Mã giảm giá",
    icon: <FontAwesomeIcon icon={faTicket} />,
  },
  {
    segment: "statistics",
    title: "Thống kê",
    icon: <FontAwesomeIcon icon={faChartPie} />,
  },
  {
    segment: "transactions",
    title: "Giao dịch",
    icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
  },
  {
    segment: "resources",
    title: "Tài nguyên",
    icon: <FontAwesomeIcon icon={faDatabase} />,
  },
  {
    segment: "travel",
    title: "Điểm du lịch",
    icon: <FontAwesomeIcon icon={faUmbrellaBeach} />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Cài đặt",
  },
  {
    segment: "settings",
    title: "Cài đặt",
    icon: <FontAwesomeIcon icon={faGear} />,
  },
  {
    segment: "tools",
    title: "Công cụ",
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
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

function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [session, setSession] = React.useState({
    user: {
      name: "Cô giáo thảo",
      email: "hentaivn@gmail.com",
      image: "https://images.kienthuc.net.vn/zoomh/800/uploaded/phuongdh/2024_10_24/4/gai-xinh-so-huu-vong-3-to-bat-thuong-cham-chi-khoe-dang.jpg",
    },
  });

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const demoWindow = window !== undefined ? window() : undefined;

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Cô giáo thảo",
            email: "hentaivn@gmail.com",
            image: "https://images.kienthuc.net.vn/zoomh/800/uploaded/phuongdh/2024_10_24/4/gai-xinh-so-huu-vong-3-to-bat-thuong-cham-chi-khoe-dang.jpg",
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
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      {/* <UserAvatar user={session.user} onClick={handleOpenUserMenu} /> */}
      <DashboardLayout>
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
