import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Profile.css";
import UserAvatarWithDropdown from "../../Components/Avatar";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import ChangePassword from "./ChangePass/ChangePassword";
import InfoDetails from "./InfoDetails/InfoDetails";
import YourTripsQuery from "./YourTripQuery/YourTripsQuery";
import { UserService } from "../../../services/apis/UserService";
import Loader from "../../Components/Loading";

const Profile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [profile, setProfile] = useState({});
  const [activeItem, setActiveItem] = useState("profile");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Load thông tin chi tiết người dùng
  const loadDetailUser = async () => {
    try {
      setIsLoading(true);
      const res = await UserService.getDetail();
      setProfile(res.data.data);
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Vui lòng đăng nhập và thử lại",
        {
          variant: "error",
          autoHideDuration: 1000,
          onExited: () => {
            navigate("/login");
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Thông tin cá nhân";
    loadDetailUser();
  }, []);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1] || "profile";
    setActiveItem(lastSegment);
  }, [location.pathname]);

  const componentMapping = {
    profile: (
      <ProfileDetail
        imgUrl={profile.image ? profile.image.url : null}
        name={profile.fullName}
        username={profile.userName}
        loadAgain={loadDetailUser}
      />
    ),
    "change-password": <ChangePassword email={profile.email} />,
    detail: (
      <InfoDetails
        email={profile.email}
        phone={profile.phoneNumber}
        birthdate={profile.birthdate}
        loadAgain={loadDetailUser}
      />
    ),
    trip: <YourTripsQuery />,
    "trip-save": <div>Chuyến đi đã lưu</div>,
  };

  return (
    <div className="container mt-5">
      <div className="profile-container">
        <button className="close-button" onClick={() => navigate("/")}>
          X
        </button>
        <div className="left">
          <div className="head">
            <h3 className="mb-1" style={{ fontWeight: "800" }}>
              Plan for Trips
            </h3>
            <h2 className="mb-2" style={{ fontWeight: "600" }}>
              Trung tâm tài khoản
            </h2>
            <p style={{ margin: "0" }}>
              Quản lý trải nghiệm được kết nối và cài đặt tài khoản của bạn trên
              nền tảng Plan for Trips.
            </p>
          </div>
          <div className="sidebar mt-4">
            <h3 style={{ fontWeight: "700" }}>Cài đặt tài khoản</h3>
            <ul>
              <li className={activeItem === "profile" ? "active" : ""}>
                <Link to="/profile" className="d-flex">
                  <PersonOutlineOutlinedIcon />
                  <span>Hồ sơ</span>
                </Link>
              </li>
              <li className={activeItem === "change-password" ? "active" : ""}>
                <Link to="/profile/change-password" className="d-flex">
                  <AdminPanelSettingsOutlinedIcon />
                  <span>Mật khẩu</span>
                </Link>
              </li>
              <li className={activeItem === "detail" ? "active" : ""}>
                <Link to="/profile/detail" className="d-flex">
                  <PortraitOutlinedIcon />
                  <span>Thông tin cá nhân</span>
                </Link>
              </li>
              <li className={activeItem === "trip" ? "active" : ""}>
                <Link to="/profile/trip" className="d-flex">
                  <BackpackOutlinedIcon />
                  <span>Chuyến đi của bạn</span>
                </Link>
              </li>
              <li className={activeItem === "trip-save" ? "active" : ""}>
                <Link to="/profile/trip-save" className="d-flex">
                  <TurnedInNotIcon />
                  <span>Chuyến đi đã lưu</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right">
          {isLoading ? (
            <Loader rong={"80vh"} />
          ) : (
            <>
              {componentMapping[activeItem] || (
                <div>Vui lòng chọn một mục.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
