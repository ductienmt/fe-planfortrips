import React, { useEffect, useState } from "react";
import "./Profile.css";
import UserAvatarWithDropdown from "../../Components/Avatar";
import { UserService } from "../../../services/apis/UserService";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import { useSnackbar } from "notistack";

const Profile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [profile, setProfile] = useState({});
  const [activeItem, setActiveItem] = useState("profile");
  const navigate = useNavigate();

  const loadDetailUser = async () => {
    try {
      const res = await UserService.getDetail();
      setProfile(res.data.data);
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Vui lòng đăng nhập và thử lại",
        {
          variant: "error",
          autoHideDuration: 1000,
        }
      );
    }
  };

  useEffect(() => {
    loadDetailUser();
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const handleClose = () => {
    navigate("/"); // Chuyển đến trang chủ
  };
  const renderRightSection = () => {
    switch (activeItem) {
      case "profile":
        return (
          <ProfileDetail
            imgUrl={profile.image ? profile.image.url : null}
            name={profile.fullName}
            username={profile.userName}
            loadAgain={loadDetailUser}
          />
        );
      case "password":
        return <div>Mục thay đổi mật khẩu</div>;
      case "detail":
        return <div>Thông tin chi tiết được chọn</div>;
      case "trip":
        return <div>Chuyến đi của bạn</div>;
      case "trip-save":
        return <div>Chuyến đi đã lưu</div>;
      default:
        return <div>Vui lòng chọn một mục.</div>;
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="profile-container">
          <button className="close-button" onClick={handleClose}>
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
                Quản lý trải nghiệm được kết nối và cài đặt tài khoản của bạn
                trên nền tảng Plan for Trips.
              </p>
            </div>
            <div className="sidebar mt-4">
              <h3 style={{ fontWeight: "700" }}>Cài đặt tài khoản</h3>
              <ul>
                <li
                  className={activeItem === "profile" ? "active" : ""}
                  onClick={() => handleItemClick("profile")}
                >
                  <Link to="" style={{ fontSize: "18px" }} className="d-flex">
                    <PersonOutlineOutlinedIcon />
                    <span>Hồ sơ</span>
                  </Link>
                </li>
                <li
                  className={
                    activeItem === "password" ? "active text-white" : ""
                  }
                  onClick={() => handleItemClick("password")}
                >
                  <Link
                    // to={"password"}
                    to={"#"}
                    style={{ fontSize: "18px" }}
                    className="d-flex"
                  >
                    <AdminPanelSettingsOutlinedIcon />
                    <span>Mật khẩu</span>
                  </Link>
                </li>
                <li
                  className={activeItem === "detail" ? "active" : ""}
                  onClick={() => handleItemClick("detail")}
                >
                  <Link
                    // to={"detail"}
                    to={"#"}
                    style={{ fontSize: "18px" }}
                    className="d-flex"
                  >
                    <PortraitOutlinedIcon />
                    <span>Thông tin cá nhân</span>
                  </Link>
                </li>
                <li
                  className={activeItem === "trip" ? "active" : ""}
                  onClick={() => handleItemClick("trip")}
                >
                  <Link
                    // to={"trip"}
                    to={"#"}
                    style={{ fontSize: "18px" }}
                    className="d-flex"
                  >
                    <BackpackOutlinedIcon />
                    <span>Chuyến đi của bạn</span>
                  </Link>
                </li>
                <li
                  className={activeItem === "trip-save" ? "active" : ""}
                  onClick={() => handleItemClick("trip-save")}
                >
                  <Link
                    // to={"trip-save"}
                    to={"#"}
                    style={{ fontSize: "18px" }}
                    className="d-flex"
                  >
                    <TurnedInNotIcon />
                    <span>Chuyến đi đã lưu</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="right">{renderRightSection()}</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
