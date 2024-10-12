import { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleInputChange } from "../../utils/FormatMoney"; // Đường dẫn tới file FormatMoney.js
import provinces from "../../utils/Province"; // Đường dẫn tới file Province.js
import "./HomePage.css";

function HomePage() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showNumberBox, setShowNumberBox] = useState(false);

  const ngayDiRef = useRef(null);
  const ngayVeRef = useRef(null);
  const [loiNgay, setLoiNgay] = useState("");

  const [budget, setBudget] = useState(""); // Trạng thái cho ngân sách
  const [error, setError] = useState(""); // Trạng thái cho thông báo lỗi

  const [viTriHienTai, setViTriHienTai] = useState("");

  // Hàm tìm kiếm và gợi ý
  const filteredProvinces = provinces.filter((province) =>
    province.toLowerCase().startsWith(viTriHienTai.toLowerCase())
  );

  useEffect(() => {
    if (error) {
      // Ẩn thông báo lỗi sau 3 giây
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      // Dọn dẹp hàm trong useEffect
      return () => clearTimeout(timer);
    }
  }, [error]);

  const today = new Date();
  const maxDate = new Date(new Date().setFullYear(today.getFullYear() + 1));

  const VietnamesePlan = {
    weekdays: {
      shorthand: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      longhand: [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ],
    },
    months: {
      shorthand: [
        "Th1",
        "Th2",
        "Th3",
        "Th4",
        "Th5",
        "Th6",
        "Th7",
        "Th8",
        "Th9",
        "Th10",
        "Th11",
        "Th12",
      ],
      longhand: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
    firstDayOfWeek: 1,
    rangeSeparator: " đến ",
    weekAbbreviation: "Tuần",
    scrollTitle: "Cuộn để tăng giảm",
    toggleTitle: "Nhấp để chuyển đổi",
    ordinal: (nth) => {
      if (nth > 1) return "th";
      return "";
    },
  };

  useEffect(() => {
    if (ngayDiRef.current && ngayVeRef.current) {
      const ngayDiPicker = flatpickr(ngayDiRef.current, {
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
        locale: VietnamesePlan,
        minDate: today,
        maxDate: maxDate,
        onChange: function (selectedDates) {
          const ngayDi = selectedDates[0];
          const ngayVe = ngayVePicker.selectedDates[0];

          if (ngayVe && ngayVe < ngayDi) {
            ngayVePicker.setDate(ngayDi);
            setLoiNgay("Ngày về không thể trước ngày đi!");
          } else {
            setLoiNgay("");
          }
        },
      });

      const ngayVePicker = flatpickr(ngayVeRef.current, {
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
        locale: VietnamesePlan,
        minDate: today,
        maxDate: maxDate,
        onChange: function (selectedDates) {
          const ngayDi = ngayDiPicker.selectedDates[0];
          const ngayVe = selectedDates[0];

          if (ngayDi && ngayVe < ngayDi) {
            setLoiNgay("Ngày về không thể trước ngày đi!");
          } else {
            setLoiNgay("");
          }
        },
      });

      ngayDiPicker.config.onChange.push(() => {
        ngayVePicker.open();
      });

      return () => {
        ngayDiPicker.destroy();
        ngayVePicker.destroy();
      };
    }
  }, []);

  const handleIncrement = (type) => {
    if (type === "adult") {
      setAdults(adults + 1);
    } else if (type === "child") {
      setChildren(children + 1);
    } else if (type === "infant") {
      setInfants(infants + 1);
    }
  };

  const handleDecrement = (type) => {
    if (type === "adult" && adults > 0) {
      setAdults(adults - 1);
    } else if (type === "child" && children > 0) {
      setChildren(children - 1);
    } else if (type === "infant" && infants > 0) {
      setInfants(infants - 1);
    }
  };

  return (
    <div className="plan-container">
      <div className="overlay"></div>
      <h1 className="text-white">Nhập điểm đến của bạn</h1>
      <h3 className="text-white">
        Plan for Trips, Nơi những chuyến đi tạo nên những ký ức đẹp.
      </h3>
      <div className="form-container p-4 bg-light rounded">
        {/* Nhập điểm đến */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
          <label htmlFor="viTriHienTai" className="form-label">
                Vị trí hiện tại
            </label>
            <input
                type="text"
                id="viTriHienTai"
                className="form-control"
                placeholder="Nhập Tỉnh, thành phố bạn đang ở"
                value={viTriHienTai}
                onChange={(e) => setViTriHienTai(e.target.value)}
            />
            {viTriHienTai && filteredProvinces.length > 0 && (
                <ul className="suggestions">
                    {filteredProvinces.map((province, index) => (
                        <li key={index} onClick={() => setViTriHienTai(province)}>
                            {province}
                        </li>
                    ))}
                </ul>
            )}
          </div>
          <div className="col-md-6 d-flex flex-column">
            <label htmlFor="diemDen" className="form-label">
              Điểm đến
            </label>
            <input
              type="text"
              id="diemDen"
              className="form-control"
              placeholder="Nhập thành phố hoặc địa điểm du lịch"
            />
          </div>
        </div>

        {/* Ngày đi và Ngày về */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
            <label htmlFor="ngay-di" className="form-label">
              Ngày đi
            </label>
            <input
              ref={ngayDiRef}
              id="ngay-di"
              className="form-control"
              placeholder="Chọn ngày đi"
            />
          </div>
          <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
            <label htmlFor="ngay-ve" className="form-label">
              Ngày về
            </label>
            <input
              ref={ngayVeRef}
              id="ngay-ve"
              className="form-control"
              placeholder="Chọn ngày về"
            />
          </div>
        </div>
        <div>
          {/* Hiển thị lỗi nếu có */}
          {loiNgay && <div className="text-danger mb-3 loiNgay">{loiNgay}</div>}
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-3 d-flex flex-column">
            <label htmlFor="budget" className="form-label">
              Chi phí cho chuyến đi
            </label>
            <input
              type="text"
              id="budget"
              className="form-control"
              placeholder="Ví dụ: 5,000,000₫"
              value={budget}
              onChange={(e) => handleInputChange(e, setBudget, setError)} // Sử dụng hàm xử lý
            />
            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <div className="text-danger mb-3">{error}</div>}
          </div>
          <div className="col-md-6 mb-3 d-flex flex-column">
            <label htmlFor="people" className="form-label">
              Số lượng người
            </label>
            <input
              type="text"
              id="people"
              className="form-control"
              value={`${adults} người lớn, ${children} trẻ em, ${infants} trẻ sơ sinh`}
              readOnly
              onClick={() => setShowNumberBox(!showNumberBox)}
            />
            {showNumberBox && (
              <div className="number-box">
                <ul>
                  <li>
                    <div className="number-left">
                      <p>Người lớn</p>
                    </div>
                    <div className="number-right">
                      <button
                        className="decrement"
                        onClick={() => handleDecrement("adult")}
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        className="increment"
                        onClick={() => handleIncrement("adult")}
                      >
                        +
                      </button>
                    </div>
                  </li>

                  <li>
                    <div className="number-left">
                      <p>Trẻ em</p>
                    </div>
                    <div className="number-right">
                      <button
                        className="decrement"
                        onClick={() => handleDecrement("child")}
                      >
                        -
                      </button>
                      <span>{children}</span>
                      <button
                        className="increment"
                        onClick={() => handleIncrement("child")}
                      >
                        +
                      </button>
                    </div>
                  </li>

                  <li>
                    <div className="number-left">
                      <p>Trẻ sơ sinh</p>
                    </div>
                    <div className="number-right">
                      <button
                        className="decrement"
                        onClick={() => handleDecrement("infant")}
                      >
                        -
                      </button>
                      <span>{infants}</span>
                      <button
                        className="increment"
                        onClick={() => handleIncrement("infant")}
                      >
                        +
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <button type="button" className="btn btn-primary w-100">
          Lên kế hoạch
        </button>
      </div>
    </div>
  );
}

export default HomePage;
