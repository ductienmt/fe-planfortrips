import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="mt-3">
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
            <a href="/register" className="btn btn-register">
              Đăng ký
            </a>
            <a href="/login" className="btn btn-login">
              Đăng nhập
            </a>
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
                <a className="nav-link" href="#">
                  Trang chủ
                </a>
                <a className="nav-link" href="#">
                  Phương tiện
                </a>
                <a className="nav-link" href="#">
                  Khách sạn
                </a>
                <a className="nav-link" href="#">
                  Hàn quán
                </a>
                <a className="nav-link" href="#">
                  Tham quan
                </a>
                <a className="nav-link" href="#">
                  Hợp tác
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
