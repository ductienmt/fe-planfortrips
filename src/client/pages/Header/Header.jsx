import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import handleToken from "../../../services/HandleToken";
import { useNavigate } from "react-router-dom";
import avt from "../../../assets/avt.jpg";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const [showDropdown, setShowDropdown] = useState(false); // Trạng thái của modal khi bấm vào avatar
  const user = localStorage.getItem("username");
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    handleToken.delete();
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <>
      <header className="custom-header mt-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <form className="d-flex me-2" role="search">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Tìm kiếm..."
                aria-label="Search"
              />
            </div>
          </form>

          <h1 className="text-center flex-grow-1">Plan for Trips</h1>

          <div>
            {!isLoggedIn ? (
              <>
                <a href="/register" className="btn btn-register">
                  Đăng ký
                </a>
                <a href="/login" className="btn btn-login">
                  Đăng nhập
                </a>
              </>
            ) : (
              <div
                className="user-menu"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexDirection: "row",
                }}
              >
                <p style={{ margin: 0 }}>Xin chào, {user}</p>
                <img
                  src={avt}
                  alt="User Avatar"
                  className="user-avatar"
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className="user-dropdown">
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src={avt}
                            alt="User Avatar"
                            className="user-avatar"
                            onClick={toggleDropdown}
                          />
                          <p style={{ margin: 0 }}>{user}</p>
                        </Link>
                      </li>
                      <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
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
                <Link className="nav-link" to="/">
                  Trang chủ
                </Link>{" "}
                <span>|</span>
                <Link to="/plan" className="nav-link">
                  Lập kế hoạch
                </Link>
                <span>|</span>
                <Link className="nav-link" to="#">
                  Phương tiện
                </Link>
                <span>|</span>
                <Link className="nav-link" to="#">
                  Khách sạn
                </Link>
                <span>|</span>
                <Link className="nav-link" to="#">
                  Ẩm thực
                </Link>
                <span>|</span>
                <Link className="nav-link" to="#">
                  Tham quan
                </Link>
                <span>|</span>
                <Link className="nav-link" to="#">
                  Hợp tác
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
