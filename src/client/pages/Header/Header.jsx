import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import handleToken from "../../../services/HandleToken";
import { useNavigate } from "react-router-dom";
import Avatar from "../../Components/Avatar";
import { InputFlied } from "../../Components/Input/InputFlied";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = localStorage.getItem("username");

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    handleToken.delete();
    setShowDropdown(false);
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
              <InputFlied
                nameInput={"search"}
                content={"Tìm kiếm"}
                typeInput={"text"}
              />
            </div>
          </form>

          <h1 className="text-center flex-grow-1">Plan for Trips</h1>

          <div>
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
                  gap: "10px",
                  flexDirection: "row",
                }}
              >
                <Avatar
                  fullname="Nguyễn Văn A"
                  gender="Nam"
                  imageUrl={null}
                  onClick={toggleDropdown}
                  showDropdown={showDropdown}
                  handleLogout={handleLogout}
                />
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
                <Link className="nav-link" to="/hotel">
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
