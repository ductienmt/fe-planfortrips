import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import handleToken from "../../../services/HandleToken";
import { useNavigate } from "react-router-dom";
import Avatar from "../../Components/Avatar";
import { InputFlied } from "../../Components/Input/InputFlied";
import { UserService } from "../../../services/apis/UserService";
import { useAuth } from "../../../context/AuthContext/AuthProvider";

const Header = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Theo dõi URL
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    gender: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (username) {
      setIsLoggedIn(true);
      loadUser();
    } else {
      setIsLoggedIn(false);
    }
  }, [username]);

  // Đóng dropdown khi URL thay đổi
  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleMoveYourTrip = (event) => {
    event.preventDefault();
    navigate(`/profile/trip`);
  };

  const loadUser = async () => {
    try {
      const res = await UserService.getImage();
      setUserInfo({
        fullname: res.data.data.fullname,
        gender: res.data.data.gender,
        imageUrl: res.data.data.url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Đóng dropdown nếu nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="custom-header mt-3">
        <div className="d-flex justify-content-between ms-3 me-3">
          <form className="d-flex me-2" role="search">
            <div className="input-group">
              <InputFlied
                nameInput={"search"}
                content={"Tìm kiếm"}
                typeInput={"text"}
              />
            </div>
          </form>

          <h1 className="text-center flex-grow-1">Plan for Trips</h1>

          <div style={{ width: "209px", justifyContent: "end" }}>
            {!isLoggedIn ? (
              <>
                <Link to={"/register"} className="btn btn-register">
                  Đăng ký
                </Link>
                <Link to={"/login"} className="btn btn-login">
                  Đăng nhập
                </Link>
              </>
            ) : (
              <div
                className="user-menu"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "10px",
                  flexDirection: "row",
                }}
              >
                <Avatar
                  fullname={userInfo.fullname}
                  gender={userInfo.gender}
                  imageUrl={userInfo.imageUrl}
                  onClick={toggleDropdown}
                  showDropdown={showDropdown}
                  handleLogout={handleLogout}
                  handleMoveYourTrip={handleMoveYourTrip}
                />
                {/* Hiển thị dropdown nếu showDropdown là true */}
                {showDropdown && (
                  <div className="dropdown-menu">
                    {/* Nội dung dropdown */}
                    <button onClick={handleMoveYourTrip}>Your Trip</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <hr />
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav custom-nav">
                <Link className="nav-link" to="/" style={{ fontSize: "18px" }}>
                  Trang chủ
                </Link>{" "}
                <span className="me-2 ms-2">|</span>
                <Link
                  to="/plan"
                  className="nav-link"
                  style={{ fontSize: "18px" }}
                >
                  Lập kế hoạch
                </Link>
                <span className="me-2 ms-2">|</span>
                <Link
                  className="nav-link"
                  to="/vehicle-page"
                  style={{ fontSize: "18px" }}
                >
                  Phương tiện
                </Link>
                <span className="me-2 ms-2">|</span>
                <Link
                  className="nav-link"
                  to="/hotel-intro"
                  style={{ fontSize: "18px" }}
                >
                  Khách sạn
                </Link>
                <span className="me-2 ms-2">|</span>
                {/* <Link className="nav-link" to="#" style={{ fontSize: "18px" }}>
                  Ẩm thực
                </Link>
                <span className="me-2 ms-2">|</span> */}
                <Link className="nav-link" to="#" style={{ fontSize: "18px" }}>
                  Tham quan
                </Link>
                <span className="me-2 ms-2">|</span>
                <Link
                  className="nav-link"
                  to="/submit-enterprise"
                  style={{ fontSize: "18px" }}
                >
                  Hợp tác
                </Link>
                <span className="me-2 ms-2">|</span>
                <Link className="nav-link" to="/tour" style={{ fontSize: "18px" }}>
                  Tour
                </Link>{" "}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
