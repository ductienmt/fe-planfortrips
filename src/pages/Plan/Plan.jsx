import "./Plan.css";

const Plan = () => {
  return (
    <div className="container mt-4">
      {/* Header Info Section */}
      <div className="row mb-4 text-center">
        <div className="col">
          <div className="info-box">
            <h5>Vũng Tàu</h5>
            <p>Điểm đến</p>
          </div>
        </div>
        <div className="col">
          <div className="info-box">
            <h5>26/09/2024</h5>
            <p>Ngày đi</p>
          </div>
        </div>
        <div className="col">
          <div className="info-box">
            <h5>27/09/2024</h5>
            <p>Ngày về</p>
          </div>
        </div>
        <div className="col">
          <div className="info-box">
            <h5>2 người</h5>
            <p>Số người</p>
          </div>
        </div>
        <div className="col">
          <div className="info-box">
            <h5>2.000.000 VNĐ</h5>
            <p>Chi phí</p>
          </div>
        </div>
        <div className="col">
          <div className="info-box">
            <h5>500.000 VNĐ</h5>
            <p>Còn dư</p>
          </div>
        </div>
      </div>

      {/* Horizontal Flexbox for Sections */}
      <div className="row mb-4 plan-sections">
        {/* Phương Trang Bus Section */}
        <div className="col-md-4 section-item">
          <div className="bus-card">
            <img
              src="https://th.bing.com/th/id/OIP.SXEca_HW7gt0926jorc8YwHaEs?w=286&h=182&c=7&r=0&o=5&pid=1.7"
              alt="Phương Trang Bus"
              className="img-fluid rounded bus-image"
            />
            <div className="bus-info p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>Phương Trang</h6>
                  <p>A01</p>
                </div>
                <div className="logo-placeholder">
                  <img
                    src="logo-placeholder-url.png"
                    alt="Logo"
                    className="logo"
                  />
                </div>
              </div>
              <p>
                <strong>00:00</strong> - Hồ Chí Minh, Bến xe Miền Đông Mới
              </p>
              <p>
                <strong>02:00</strong> - Vũng Tàu, Bến xe Vũng Tàu
              </p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary">Xem chi tiết vé xe</button>
                <button className="btn btn-outline-primary">
                  Thay đổi vé xe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Homestay Section */}
        <div className="col-md-4 section-item">
          <div className="homestay-card">
            <div className="row">
              <div className="col-6">
                <img
                  src="https://th.bing.com/th/id/OIP.NjFjRh2oE5mY32fEIxkytQHaFO?w=284&h=200&c=7&r=0&o=5&pid=1.7"
                  alt="Homestay"
                  className="img-fluid rounded mb-2 homestay-image"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://th.bing.com/th/id/OIP.5UzCxtMiTttYhn_rU0EbsAHaFF?w=260&h=180&c=7&r=0&o=5&pid=1.7"
                  alt="Homestay"
                  className="img-fluid rounded mb-2 homestay-image"
                />
              </div>
              <div className="col-12">
                <img
                  src="https://th.bing.com/th?id=OIF.zQMG80Z%2fvMvQhIgLvP0R3w&w=258&h=180&c=7&r=0&o=5&pid=1.7"
                  alt="Homestay Room"
                  className="img-fluid rounded mb-2 homestay-image"
                />
              </div>
            </div>
            <div className="homestay-info p-3">
              <h6>Babyboo Homestay</h6>
              <p>Check-in: 14:00 - Check-out: 12:00</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary">Xem chi tiết nơi ở</button>
                <button className="btn btn-outline-primary">
                  Thay đổi nơi ở
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vũng Tàu Beach Section */}
        <div className="col-md-4 section-item">
          <div className="beach-card">
            <img
              src="https://th.bing.com/th/id/OIP.ZW7_kPqGruR7TuqNh-FojAHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Vũng Tàu Beach"
              className="img-fluid rounded beach-image"
            />
            <div className="beach-info p-3">
              <p className="text-center mt-2">
                Bãi sau Vũng tàu - Vé vào cổng: Miễn phí
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
